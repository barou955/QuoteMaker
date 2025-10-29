import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteSchema } from "@shared/schema";
import PDFDocument from 'pdfkit';

export async function registerRoutes(app: Express): Promise<Server> {

  // Create a new quote
  app.post("/api/quotes", async (req, res) => {
    try {
      const validatedData = insertQuoteSchema.parse(req.body);
      const quote = await storage.createQuote(validatedData);
      res.json(quote);
    } catch (error) {
      console.error('Error creating quote:', error);
      res.status(400).json({ message: "Invalid quote data" });
    }
  });

  // Get all quotes
  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json(quotes);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      res.status(500).json({ message: "Error fetching quotes" });
    }
  });

  // Get a specific quote
  app.get("/api/quotes/:id", async (req, res) => {
    try {
      const quote = await storage.getQuote(req.params.id);
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      res.json(quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
      res.status(500).json({ message: "Error fetching quote" });
    }
  });

  // Generate PDF for quote
  app.post("/api/quotes/generate-pdf", async (req, res) => {
    try {
      const {
        countryLanguage,
        institutionType,
        contactInfo,
        selectedCytometers,
        selectedModules,
        selectedOptions,
        selectedLocation,
        numberOfParticipants,
        totalPrice,
        originalPrice,
        discountAmount,
        automaticComments
      } = req.body;

      const doc = new PDFDocument({ margin: 50, size: 'A4' });

      // Set response headers
      const isEnglish = countryLanguage === 'BNL';
      const filename = isEnglish ? 'bd-training-quote.pdf' : 'devis-bd-formation.pdf';
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      // Pipe PDF to response
      doc.pipe(res);

      // Generate quote number and date
      const now = new Date();
      const quoteNumber = `BD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}-${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}`;
      const currentDate = now.toLocaleDateString(isEnglish ? 'en-GB' : 'fr-FR');

      // Header with logo
      const logoUrl = 'https://i.ibb.co/xqb74hWC/bd1-logo-1757350473636.jpg';
      const https = await import('https');
      
      await new Promise<void>((resolve, reject) => {
        https.get(logoUrl, (response) => {
          const chunks: Buffer[] = [];
          response.on('data', (chunk) => chunks.push(chunk));
          response.on('end', () => {
            const buffer = Buffer.concat(chunks);
            doc.image(buffer, 50, 45, { width: 80 });
            resolve();
          });
          response.on('error', reject);
        }).on('error', reject);
      });

      const companyName = countryLanguage === 'FR'
        ? 'Becton Dickinson France'
        : 'Becton Dickinson Benelux';
      doc.fontSize(10).fillColor('#666').text(companyName, 50, 130);

      const quoteTitle = isEnglish ? 'Training Quote' : 'Devis Formation';
      const dateLabel = isEnglish ? 'Date' : 'Date';
      doc.fontSize(14).fillColor('#000').text(quoteTitle, 400, 50);
      doc.fontSize(10).text(`N° ${quoteNumber}`, 400, 70);
      doc.fontSize(10).text(`${dateLabel}: ${currentDate}`, 400, 85);

      // Client information
      let yPos = 160;
      const clientInfoTitle = isEnglish ? 'Client Information' : 'Informations Client';
      doc.fontSize(12).fillColor('#1e40af').text(clientInfoTitle, 50, yPos);
      yPos += 18;
      doc.fontSize(10).fillColor('#000').text(`${contactInfo.title} ${contactInfo.name}`, 50, yPos);
      yPos += 14;
      doc.fontSize(10).text(contactInfo.institution, 50, yPos);
      yPos += 14;
      doc.fontSize(10).text(contactInfo.email, 50, yPos);
      yPos += 14;
      if (contactInfo.phone) {
        doc.fontSize(10).text(contactInfo.phone, 50, yPos);
        yPos += 14;
      }
      doc.fontSize(10).text(contactInfo.address.replace(/\n/g, ', '), 50, yPos, { width: 250 });
      yPos += doc.heightOfString(contactInfo.address.replace(/\n/g, ', '), { width: 250 }) + 5;

      // Institution and formation details
      yPos += 15;
      const trainingDetailsTitle = isEnglish ? 'Training Details' : 'Détails de la Formation';
      doc.fontSize(12).fillColor('#1e40af').text(trainingDetailsTitle, 50, yPos);
      yPos += 18;

      const institutionTypeText = institutionType === 'public'
        ? (isEnglish ? 'Public Institution' : 'Établissement Public')
        : (isEnglish ? 'Private Institution' : 'Établissement Privé');
      const countryText = countryLanguage === 'FR' ? 'France' : 'Benelux';

      const typeLabel = isEnglish ? 'Type' : 'Type';
      const countryLabel = isEnglish ? 'Country' : 'Pays';
      const locationLabel = isEnglish ? 'Location' : 'Lieu';
      const participantsLabel = isEnglish ? 'Participants' : 'Participants';

      doc.fontSize(10).fillColor('#000').text(`${typeLabel}: ${institutionTypeText}`, 50, yPos);
      doc.fontSize(10).text(`${countryLabel}: ${countryText}`, 300, yPos);
      yPos += 14;
      doc.fontSize(10).text(`${locationLabel}: ${selectedLocation}`, 50, yPos);
      doc.fontSize(10).text(`${participantsLabel}: ${numberOfParticipants}`, 300, yPos);
      yPos += 25;

      // Items table
      const servicesTitle = isEnglish ? 'Services' : 'Prestations';
      doc.fontSize(12).fillColor('#1e40af').text(servicesTitle, 50, yPos);
      yPos += 20;

      const isPublic = institutionType === 'public';

      // Table header
      const descriptionLabel = isEnglish ? 'Description' : 'Description';
      const durationLabel = isEnglish ? 'Duration' : 'Durée';
      const priceLabel = isEnglish ? 'Price' : 'Prix HT';
      
      doc.fontSize(9).fillColor('#666').text(descriptionLabel, 50, yPos);
      doc.text(durationLabel, 280, yPos);
      doc.text(priceLabel, 450, yPos, { width: 95, align: 'right' });
      yPos += 12;
      doc.moveTo(50, yPos).lineTo(545, yPos).stroke('#ddd');
      yPos += 8;

      // Add cytometers
      selectedCytometers.forEach((cytometer: any) => {
        const price = isPublic ? cytometer.pricePublic : cytometer.pricePrivate;
        const duration = cytometer.duration || '—';
        doc.fontSize(9).fillColor('#000').text(cytometer.name, 50, yPos, { width: 220 });
        doc.fontSize(9).fillColor('#666').text(duration, 280, yPos);
        doc.fontSize(9).fillColor('#000').text(`${(price / 100).toFixed(2)} €`, 450, yPos, { width: 95, align: 'right' });
        yPos += 16;
      });

      // Add modules
      selectedModules.forEach((module: any) => {
        const price = isPublic ? module.pricePublic : module.pricePrivate;
        const moduleLabel = isEnglish ? 'Module' : 'Module';
        doc.fontSize(9).fillColor('#000').text(module.name, 50, yPos, { width: 220 });
        doc.fontSize(9).fillColor('#666').text(moduleLabel, 280, yPos);
        doc.fontSize(9).fillColor('#000').text(`${(price / 100).toFixed(2)} €`, 450, yPos, { width: 95, align: 'right' });
        yPos += 16;
      });

      // Add options
      selectedOptions.forEach((option: any) => {
        const price = isPublic ? option.pricePublic : option.pricePrivate;
        const optionLabel = isEnglish ? 'Option' : 'Option';
        doc.fontSize(9).fillColor('#000').text(option.name, 50, yPos, { width: 220 });
        doc.fontSize(9).fillColor('#666').text(optionLabel, 280, yPos);
        doc.fontSize(9).fillColor('#000').text(`${(price / 100).toFixed(2)} €`, 450, yPos, { width: 95, align: 'right' });
        yPos += 16;
      });

      yPos += 5;

      // Discount section
      if (discountAmount > 0) {
        doc.moveTo(50, yPos).lineTo(545, yPos).stroke('#ddd');
        yPos += 8;
        const subtotalLabel = isEnglish ? 'Subtotal' : 'Sous-total HT';
        doc.fontSize(9).fillColor('#000').text(subtotalLabel, 50, yPos);
        doc.text(`${(originalPrice / 100).toFixed(2)} €`, 450, yPos, { width: 95, align: 'right' });
        yPos += 14;
        const discountLabel = isEnglish ? 'Discount applied' : 'Remise appliquée';
        doc.fontSize(9).fillColor('#e63946').text(discountLabel, 50, yPos);
        doc.text(`-${(discountAmount / 100).toFixed(2)} €`, 450, yPos, { width: 95, align: 'right' });
        yPos += 14;
      }

      // Total
      yPos += 5;
      doc.moveTo(50, yPos).lineTo(545, yPos).stroke('#000');
      yPos += 10;
      const totalLabel = isEnglish ? 'Total' : 'Total TTC';
      doc.fontSize(12).fillColor('#000').text(totalLabel, 50, yPos);
      doc.fontSize(12).fillColor('#1e40af').text(`${(totalPrice / 100).toFixed(2)} €`, 450, yPos, { width: 95, align: 'right' });
      yPos += 25;

      // Commentaires automatiques
      if (automaticComments) {
        yPos += 10;
        const descriptionLabel = isEnglish ? 'Description' : 'Description';
        doc.fontSize(10).fillColor('#1e40af').text(descriptionLabel, 50, yPos);
        yPos += 14;
        doc.fontSize(8).fillColor('#333').text(automaticComments, 50, yPos, { width: 495, align: 'left' });
        yPos += doc.heightOfString(automaticComments, { width: 495 }) + 8;
      }

      // Terms and conditions
      yPos += 10;
      const termsLabel = isEnglish ? 'Terms & Conditions' : 'Conditions';
      const termsText = isEnglish 
        ? '• Quote valid for 30 days. Training provided by certified BD experts. Price includes documentation and post-training support.'
        : '• Devis valable 30 jours. Formations assurées par des experts certifiés BD. Prix incluant documentation et support post-formation.';
      
      doc.fontSize(10).fillColor('#1e40af').text(termsLabel, 50, yPos);
      yPos += 14;
      doc.fontSize(8).fillColor('#666').text(termsText, 50, yPos, { width: 495 });
      
      // Footer
      yPos += 25;
      const contactText = countryLanguage === 'FR'
        ? 'BD France - formation@bd.com - Tél: 01 58 83 40 40'
        : 'BD Benelux - formation.benelux@bd.com - Tel: +32 2 661 22 11';

      doc.fontSize(8).fillColor('#999').text(contactText, 50, yPos, { align: 'center', width: 495 });

      doc.end();

    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ message: "Error generating PDF" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
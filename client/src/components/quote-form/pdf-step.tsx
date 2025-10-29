import { Check, Download, Eye, Plus } from 'lucide-react';
import { Cytometer, TrainingModule, AdditionalOption, ContactInfo } from '@/types/quote';
import { formatPrice, generateQuoteNumber } from '@/lib/quote-calculator';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/i18n';

interface PDFStepProps {
  institutionType: 'public' | 'private';
  selectedCytometers: Cytometer[];
  selectedModules: TrainingModule[];
  selectedOptions: AdditionalOption[];
  totalPrice: number;
  contactInfo: ContactInfo;
  onNewQuote: () => void;
  onDownloadPDF: () => void;
  onViewFullscreen: () => void;
}

export function PDFStep({
  institutionType,
  selectedCytometers,
  selectedModules,
  selectedOptions,
  totalPrice,
  contactInfo,
  onNewQuote,
  onDownloadPDF,
  onViewFullscreen,
}: PDFStepProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const isPublic = institutionType === 'public';
  const quoteNumber = generateQuoteNumber();
  const currentDate = new Date().toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US');

  const allItems = [
    ...selectedCytometers.map(c => ({
      name: c.name,
      price: isPublic ? c.pricePublic : c.pricePrivate
    })),
    ...selectedModules.map(m => ({
      name: m.name,
      price: isPublic ? m.pricePublic : m.pricePrivate
    })),
    ...selectedOptions.map(o => ({
      name: o.name,
      price: isPublic ? o.pricePublic : o.pricePrivate
    })),
  ];

  return (
    <div className="bg-muted/30 rounded-xl p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-100 text-green-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-4">{t.quote.pdf.title}</h2>
        <p className="text-muted-foreground mb-8">
          {t.quote.pdf.subtitle}
        </p>
        
        {/* PDF Preview Area */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8 text-left" data-testid="pdf-preview">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-primary">BD</h3>
              <p className="text-sm text-muted-foreground">Becton Dickinson France</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{t.quote.pdf.quoteNumber}</p>
              <p className="text-sm text-muted-foreground">N° {quoteNumber}</p>
              <p className="text-sm text-muted-foreground">{t.quote.pdf.date}: {currentDate}</p>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 mb-6">
            <h4 className="font-semibold mb-3">{t.quote.pdf.client}</h4>
            <p data-testid="pdf-client-name">{contactInfo.name}</p>
            <p data-testid="pdf-client-institution">{contactInfo.institution}</p>
            <p data-testid="pdf-client-email">{contactInfo.email}</p>
            {contactInfo.phone && <p data-testid="pdf-client-phone">{contactInfo.phone}</p>}
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="font-semibold mb-3">{t.quote.pdf.trainingDetails}</h4>
            <div className="space-y-2" data-testid="pdf-items">
              {allItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-4 mt-6">
              <div className="flex justify-between font-bold text-lg">
                <span>{t.quote.pdf.totalTTC}</span>
                <span className="text-primary" data-testid="pdf-total">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onDownloadPDF}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-testid="button-download-pdf"
          >
            <Download className="w-4 h-4 mr-2" />
            {t.quote.pdf.downloadPDF}
          </Button>
          <Button 
            onClick={onViewFullscreen}
            variant="secondary"
            data-testid="button-view-fullscreen"
          >
            <Eye className="w-4 h-4 mr-2" />
            {t.quote.pdf.viewFullscreen}
          </Button>
          <Button 
            onClick={onNewQuote}
            variant="outline"
            data-testid="button-new-quote"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.quote.pdf.newQuote}
          </Button>
        </div>
      </div>
    </div>
  );
}

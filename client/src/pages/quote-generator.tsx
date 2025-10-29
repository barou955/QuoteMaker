import { useState } from 'react';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/i18n';
import { ProgressSteps } from '@/components/quote-form/progress-steps';
import { CountryLanguageStep } from '@/components/quote-form/country-language-step';
import { InstitutionTypeStep } from '@/components/quote-form/institution-type-step';
import { ConfigurationStep } from '@/components/quote-form/configuration-step';
import { SummaryStep } from '@/components/quote-form/summary-step';
import { PDFStep } from '@/components/quote-form/pdf-step';
import { ContactInfo, Cytometer, TrainingModule, AdditionalOption, LOCATIONS_FR, LOCATIONS_BNL } from '@/types/quote';
import { calculateQuoteTotal, calculateQuoteWithDiscounts, formatPrice, generateQuoteNumber, generateAutomaticComments } from '@/lib/quote-calculator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

export default function QuoteGenerator() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const [currentStep, setCurrentStep] = useState(1);
  const [countryLanguage, setCountryLanguage] = useState<'FR' | 'BNL' | ''>('');
  const [institutionType, setInstitutionType] = useState<'public' | 'private' | ''>('');
  const [selectedCytometers, setSelectedCytometers] = useState<Cytometer[]>([]);
  const [selectedModules, setSelectedModules] = useState<TrainingModule[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<AdditionalOption[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [numberOfParticipants, setNumberOfParticipants] = useState<number>(1);
  const [promoCode, setPromoCode] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    title: 'Madame',
    name: '',
    email: '',
    institution: '',
    address: '',
    phone: '',
  });

  // Calculate total price with discounts
  const calculation = institutionType 
    ? calculateQuoteWithDiscounts(institutionType, numberOfParticipants, selectedCytometers, selectedModules, selectedOptions, promoCode)
    : { subtotal: 0, discounts: { participantsDiscount: 0, institutionDiscount: 0, durationDiscount: 0, totalDiscount: 0 }, total: 0 };
  const totalPrice = calculation.total;

  // Generate automatic comments
  const automaticComments = (countryLanguage && institutionType) 
    ? generateAutomaticComments(
        countryLanguage,
        institutionType,
        numberOfParticipants,
        selectedCytometers,
        selectedModules,
        selectedOptions,
        calculation.discounts
      )
    : '';

  const saveQuoteMutation = useMutation({
    mutationFn: async (quoteData: any) => {
      return await apiRequest('POST', '/api/quotes', quoteData);
    },
    onSuccess: () => {
      toast({
        title: t.quote.pdf.successMessage,
        description: t.quote.pdf.successDescription,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
    },
    onError: (error) => {
      toast({
        title: t.quote.pdf.errorTitle,
        description: t.quote.pdf.errorDescription,
        variant: 'destructive',
      });
    },
  });

  const generatePDFMutation = useMutation({
    mutationFn: async (quoteData: any) => {
      const response = await apiRequest('POST', '/api/quotes/generate-pdf', quoteData);
      return response.blob();
    },
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'devis-bd-formation.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    },
    onError: () => {
      toast({
        title: t.quote.pdf.errorTitle,
        description: t.quote.pdf.errorPDF,
        variant: 'destructive',
      });
    },
  });

  const handleCountryLanguageSelect = (countryLang: 'FR' | 'BNL') => {
    // Reset all selections when changing country
    setCountryLanguage(countryLang);
    setSelectedCytometers([]);
    setSelectedModules([]);
    setSelectedOptions([]);
    setSelectedLocation('');
    setNumberOfParticipants(1);
  };

  const handleInstitutionTypeSelect = (type: 'public' | 'private') => {
    setInstitutionType(type);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleNumberOfParticipantsChange = (number: number) => {
    setNumberOfParticipants(number);
  };

  const handleCytometerToggle = (cytometer: Cytometer) => {
    setSelectedCytometers(prev => {
      const isSelected = prev.some(c => c.id === cytometer.id);
      if (isSelected) {
        // Réinitialiser les modules et options lors de la désélection d'un cytomètre
        setSelectedModules([]);
        setSelectedOptions([]);
        return prev.filter(c => c.id !== cytometer.id);
      } else {
        // Réinitialiser les modules et options lors de la sélection d'un nouveau cytomètre
        setSelectedModules([]);
        setSelectedOptions([]);
        return [...prev, cytometer];
      }
    });
  };

  const handleModuleToggle = (module: TrainingModule) => {
    setSelectedModules(prev => {
      const exists = prev.some(m => m.id === module.id);
      if (exists) {
        return prev.filter(m => m.id !== module.id);
      } else {
        return [...prev, module];
      }
    });
  };

  const handleOptionToggle = (option: AdditionalOption) => {
    setSelectedOptions(prev => {
      const exists = prev.some(o => o.id === option.id);
      if (exists) {
        return prev.filter(o => o.id !== option.id);
      } else {
        return [...prev, option];
      }
    });
  };

  // Helper function to get available locations for current selection
  const getAvailableLocations = () => {
    if (!countryLanguage || selectedCytometers.length === 0) return [];

    const countryLocations = countryLanguage === 'FR' ? LOCATIONS_FR : LOCATIONS_BNL;

    // Find intersection of available locations for all selected cytometers
    return selectedCytometers.reduce((commonLocations, cytometer) => {
      return commonLocations.filter(location => 
        cytometer.availableLocations.includes(location)
      );
    }, countryLocations);
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return countryLanguage !== '';
      case 2:
        return institutionType !== '';
      case 3:
        return selectedCytometers.length > 0 || selectedModules.length > 0;
      case 4:
        return contactInfo.name && contactInfo.email && contactInfo.institution && contactInfo.address;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 4) {
      // Generate quote and save
      const quoteData = {
        countryLanguage,
        institutionType,
        contactInfo,
        selectedCytometers,
        selectedModules,
        selectedOptions,
        selectedLocation,
        numberOfParticipants,
        totalPrice: Math.round(calculation.total * 100), // Convert to cents
        originalPrice: Math.round(calculation.subtotal * 100), // Convert to cents
        discountAmount: Math.round(calculation.discounts.totalDiscount * 100), // Convert to cents
        automaticComments,
      };
      saveQuoteMutation.mutate(quoteData);
    }

    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleDownloadPDF = () => {
    const quoteData = {
      countryLanguage,
      institutionType,
      contactInfo,
      selectedCytometers,
      selectedModules,
      selectedOptions,
      selectedLocation,
      numberOfParticipants,
      totalPrice: Math.round(calculation.total * 100), // Convert to cents
      originalPrice: Math.round(calculation.subtotal * 100), // Convert to cents
      discountAmount: Math.round(calculation.discounts.totalDiscount * 100), // Convert to cents
      automaticComments,
    };
    generatePDFMutation.mutate(quoteData);
  };

  const handleViewFullscreen = async () => {
    const quoteData = {
      countryLanguage,
      institutionType,
      contactInfo,
      selectedCytometers,
      selectedModules,
      selectedOptions,
      selectedLocation,
      numberOfParticipants,
      totalPrice: Math.round(calculation.total * 100),
      originalPrice: Math.round(calculation.subtotal * 100),
      discountAmount: Math.round(calculation.discounts.totalDiscount * 100),
      automaticComments,
    };

    try {
      const response = await fetch('/api/quotes/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) throw new Error('Erreur lors de la génération du PDF');

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      toast({
        title: t.quote.pdf.errorTitle,
        description: t.quote.pdf.errorFullscreen,
        variant: 'destructive',
      });
    }
  };

  const handleNewQuote = () => {
    // Reset all state
    setCurrentStep(1);
    setCountryLanguage('');
    setInstitutionType('');
    setSelectedCytometers([]);
    setSelectedModules([]);
    setSelectedOptions([]);
    setSelectedLocation('');
    setNumberOfParticipants(1);
    setContactInfo({
      title: 'Madame',
      name: '',
      email: '',
      institution: '',
      address: '',
      phone: '',
    });
    setLocation('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CountryLanguageStep
            countryLanguage={countryLanguage}
            onSelect={handleCountryLanguageSelect}
          />
        );
      case 2:
        return (
          <InstitutionTypeStep
            institutionType={institutionType}
            onSelect={handleInstitutionTypeSelect}
          />
        );
      case 3:
        return (
          <ConfigurationStep
            institutionType={institutionType as 'public' | 'private'}
            countryLanguage={countryLanguage as 'FR' | 'BNL'}
            selectedCytometers={selectedCytometers}
            selectedModules={selectedModules}
            selectedOptions={selectedOptions}
            selectedLocation={selectedLocation}
            numberOfParticipants={numberOfParticipants}
            onCytometerToggle={handleCytometerToggle}
            onModuleToggle={handleModuleToggle}
            onOptionToggle={handleOptionToggle}
            onLocationSelect={handleLocationSelect}
            onNumberOfParticipantsChange={handleNumberOfParticipantsChange}
          />
        );
      case 4:
        return (
          <SummaryStep
            institutionType={institutionType as 'public' | 'private'}
            countryLanguage={countryLanguage}
            numberOfParticipants={numberOfParticipants}
            selectedCytometers={selectedCytometers}
            selectedModules={selectedModules}
            selectedOptions={selectedOptions}
            totalPrice={totalPrice}
            contactInfo={contactInfo}
            automaticComments={automaticComments}
            onContactInfoChange={setContactInfo}
            promoCode={promoCode}
            onPromoCodeChange={setPromoCode}
          />
        );
      case 5:
        return (
          <PDFStep
            institutionType={institutionType as 'public' | 'private'}
            selectedCytometers={selectedCytometers}
            selectedModules={selectedModules}
            selectedOptions={selectedOptions}
            totalPrice={totalPrice}
            contactInfo={contactInfo}
            onNewQuote={handleNewQuote}
            onDownloadPDF={handleDownloadPDF}
            onViewFullscreen={handleViewFullscreen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-card min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <ProgressSteps currentStep={currentStep} />

        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <Button
              onClick={handlePrev}
              variant="outline"
              data-testid="button-prev"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.quote.navigation.previous}
            </Button>
          )}

          {currentStep < 5 && (
            <Button
              onClick={handleNext}
              disabled={!canGoNext() || saveQuoteMutation.isPending}
              className="ml-auto"
              data-testid="button-next"
            >
              {currentStep === 4 ? (
                <>
                  {saveQuoteMutation.isPending ? t.quote.navigation.generating : t.quote.navigation.generateQuote}
                  <FileText className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  {t.quote.navigation.next}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
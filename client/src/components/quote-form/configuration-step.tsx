import React, { useEffect } from 'react';
import { getCytometersByCountry, getTrainingModulesByCountry, getSoftwareModulesByCountry, getOtherModulesByCountry, getAdditionalOptionsByCountry, LOCATIONS_FR, LOCATIONS_BNL, Cytometer, TrainingModule, AdditionalOption } from '@/types/quote';
import { formatPrice } from '@/lib/quote-calculator';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/i18n';

type QuoteType = 'cytometer' | 'software' | 'other' | '';

interface ConfigurationStepProps {
  institutionType: 'public' | 'private';
  countryLanguage: 'FR' | 'BNL';
  selectedCytometers: Cytometer[];
  selectedModules: TrainingModule[];
  selectedOptions: AdditionalOption[];
  selectedLocation: string;
  numberOfParticipants: number;
  onCytometerToggle: (cytometer: Cytometer) => void;
  onModuleToggle: (module: TrainingModule) => void;
  onOptionToggle: (option: AdditionalOption) => void;
  onLocationSelect: (location: string) => void;
  onNumberOfParticipantsChange: (number: number) => void;
}

export function ConfigurationStep({
  institutionType,
  countryLanguage,
  selectedCytometers,
  selectedModules,
  selectedOptions,
  selectedLocation,
  numberOfParticipants,
  onCytometerToggle,
  onModuleToggle,
  onOptionToggle,
  onLocationSelect,
  onNumberOfParticipantsChange,
}: ConfigurationStepProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const isPublic = institutionType === 'public';
  const [quoteType, setQuoteType] = React.useState<QuoteType>('');

  // Get data based on selected country
  const CYTOMETERS = getCytometersByCountry(countryLanguage);
  const TRAINING_MODULES = getTrainingModulesByCountry(countryLanguage);
  const SOFTWARE_MODULES = getSoftwareModulesByCountry(countryLanguage);
  const OTHER_MODULES = getOtherModulesByCountry(countryLanguage);
  const ADDITIONAL_OPTIONS = getAdditionalOptionsByCountry(countryLanguage);

  // Initialize quoteType based on existing selections when component mounts
  useEffect(() => {
    if (quoteType !== '') return; // Avoid overriding user selection
    
    if (selectedCytometers.length > 0) {
      setQuoteType('cytometer');
    } else if (selectedModules.length > 0) {
      // Check if it's a software module
      const isSoftware = SOFTWARE_MODULES.some(m => selectedModules.some(sm => sm.id === m.id));
      const isOther = OTHER_MODULES.some(m => selectedModules.some(sm => sm.id === m.id));
      if (isSoftware) {
        setQuoteType('software');
      } else if (isOther) {
        setQuoteType('other');
      }
    }
  }, [selectedCytometers.length, selectedModules.length, quoteType, SOFTWARE_MODULES, OTHER_MODULES]);

  // Get maximum participants based on selected cytometers
  const getMaxParticipants = () => {
    if (selectedCytometers.length === 0) return 50; // Default maximum

    // Find the minimum maxParticipants among all selected cytometers
    const validValues = selectedCytometers
      .map(cytometer => Number(cytometer.maxParticipants))
      .filter(value => Number.isFinite(value) && value >= 1);

    return validValues.length ? Math.min(...validValues) : 50;
  };

  const maxParticipants = getMaxParticipants();

  // Auto-adjust participants number if it exceeds new limits
  useEffect(() => {
    if (numberOfParticipants > maxParticipants) {
      onNumberOfParticipantsChange(maxParticipants);
    } else if (numberOfParticipants < 1 && selectedCytometers.length > 0) {
      onNumberOfParticipantsChange(1);
    }
  }, [numberOfParticipants, maxParticipants, selectedCytometers.length, onNumberOfParticipantsChange]);

  const getCytometerImage = React.useMemo(() => {
    const imageMap: { [key: string]: string } = {
      'canto': 'https://i.ibb.co/Df9M8XqR/BD-FACSCanto-II-1.png',
      'facsymphony-a1': 'https://i.ibb.co/XrGTSSZz/Symphony-A1-Banner-Image.jpg',
      'facsymphony-a3': 'https://i.ibb.co/xcXxjGL/A3-Banner-Image.jpg',
      'facsymphony-a5': 'https://i.ibb.co/7JgwWrP0/Symphony-A5-Banner.jpg',
      'facsymphony-a5-se': 'https://i.ibb.co/3my48dCc/Symphony-A5-SE-Banner.jpg',
      'lsrfortessa-x20': 'https://i.ibb.co/C5PdsXb3/Fortessa-X20-Banner-Image.jpg',
      'facscelesta': 'https://i.ibb.co/t9y69Qc/Celesta-Banner.jpg',
      'lsr': 'https://i.ibb.co/Q58Kt8r/LSRII-Banner.jpg',
      'facsdiscover-a8': 'https://i.ibb.co/dwQPdmmc/BD-FACSDiscover-A8-Instrument-Page-Banner.jpg',
      'facsdiscover-s8': 'https://i.ibb.co/Ld15rqvZ/FACSDiscover-S8-Banner-Image.jpg',
      'facsaria-fusion': 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      'accuri-c6plus': 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      // Clinical Analyzers
      'facslyric': 'https://i.ibb.co/N6ztfpQ9/Lyric-Banner.jpg',
      'facsduet': 'https://i.ibb.co/M5RDG00h/01-BDC5941-Decision-Maker-BOF-automotion.jpg',
      'lyse-wash-assistant': 'https://i.ibb.co/PGzwYNQ0/LWA-Banner.jpg',
      'lwa': 'https://i.ibb.co/PGzwYNQ0/LWA-Banner.jpg',
      // Research Analyzers
      'lsrfortessa': 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200',
      // Cell Sorters
      'facsaria-iii': 'https://i.ibb.co/ZRP7R7yL/Aria-III-Banner.jpg',
      'facsaria-family': 'https://i.ibb.co/ZRP7R7yL/Aria-III-Banner.jpg',
      'facsmelody': 'https://i.ibb.co/Z160hxjX/Melody.jpg',
      'facsymphony-s6': 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200'
    };
    
    return (id: string) => imageMap[id] || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200';
  }, []);



  // Filter cytometers: show all if none selected, show only selected one otherwise
  const displayedCytometers = React.useMemo(() => 
    selectedCytometers.length === 0 
      ? CYTOMETERS 
      : CYTOMETERS.filter(cytometer => selectedCytometers.some(c => c.id === cytometer.id)),
    [selectedCytometers, CYTOMETERS]
  );

  // Filter modules based on selected cytometers
  const availableModules = React.useMemo(() => 
    selectedCytometers.length > 0
      ? TRAINING_MODULES.filter(module => 
          module.compatibleCytometers.some(cytometerId => 
            selectedCytometers.some(selected => selected.id === cytometerId)
          )
        )
      : [],
    [selectedCytometers, TRAINING_MODULES]
  );

  // Filter additional options based on selected modules
  const availableOptions = React.useMemo(() => 
    selectedModules.length > 0
      ? ADDITIONAL_OPTIONS.filter(option => 
          !option.compatibleModules || 
          option.compatibleModules.some(moduleId => 
            selectedModules.some(selected => selected.id === moduleId)
          )
        )
      : ADDITIONAL_OPTIONS,
    [selectedModules, ADDITIONAL_OPTIONS]
  );

  return (
    <div className="bg-muted/30 rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{t.quote.configuration.title}</h2>

      <div className="space-y-8">
        {/* Quote Type Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">{t.quote.configuration.quoteTypeSelection}</h3>
          <p className="text-muted-foreground text-center mb-6">{t.quote.configuration.quoteTypeSubtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <button
              onClick={() => setQuoteType('cytometer')}
              className={`p-6 rounded-lg border-2 transition-all ${
                quoteType === 'cytometer'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              data-testid="button-quote-type-cytometer"
            >
              <h4 className="font-semibold mb-2">{t.quote.configuration.cytometerAndSoftware}</h4>
              <p className="text-sm text-muted-foreground">{t.quote.configuration.cytometerAndSoftwareDesc}</p>
            </button>
            <button
              onClick={() => setQuoteType('software')}
              className={`p-6 rounded-lg border-2 transition-all ${
                quoteType === 'software'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              data-testid="button-quote-type-software"
            >
              <h4 className="font-semibold mb-2">{t.quote.configuration.softwareOnly}</h4>
              <p className="text-sm text-muted-foreground">{t.quote.configuration.softwareOnlyDesc}</p>
            </button>
            <button
              onClick={() => setQuoteType('other')}
              className={`p-6 rounded-lg border-2 transition-all ${
                quoteType === 'other'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              data-testid="button-quote-type-other"
            >
              <h4 className="font-semibold mb-2">{t.quote.configuration.other}</h4>
              <p className="text-sm text-muted-foreground">{t.quote.configuration.otherDesc}</p>
            </button>
          </div>
        </div>

        {/* Cytometer Selection - Only show if cytometer type is selected */}
        {quoteType === 'cytometer' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.quote.configuration.instrumentSelection}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedCytometers.map((cytometer) => {
              const isSelected = selectedCytometers.some(c => c.id === cytometer.id);
              const price = isPublic ? cytometer.pricePublic : cytometer.pricePrivate;

              return (
                <div
                  key={cytometer.id}
                  className={`cytometer-card bg-card border-2 rounded-lg p-4 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:shadow-md hover:border-primary/50'
                  }`}
                  onClick={() => onCytometerToggle(cytometer)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onCytometerToggle(cytometer);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${cytometer.name} - ${isSelected ? 'Sélectionné' : 'Non sélectionné'}`}
                  data-testid={`card-cytometer-${cytometer.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onCytometerToggle(cytometer)}
                      data-testid={`checkbox-cytometer-${cytometer.id}`}
                    />
                  </div>

                  <img
                    src={getCytometerImage(cytometer.id)}
                    alt={cytometer.name}
                    className="w-full h-32 object-contain rounded-lg mb-3"
                  />

                  <h4 className="font-semibold text-center">{cytometer.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Software Selection - Only show if software type is selected */}
        {quoteType === 'software' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.quote.configuration.softwareSelection}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SOFTWARE_MODULES.map((module) => {
              const isSelected = selectedModules.some(m => m.id === module.id);
              const price = isPublic ? module.pricePublic : module.pricePrivate;

              return (
                <div
                  key={module.id}
                  className={`module-card bg-card border-2 rounded-lg p-4 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:shadow-md hover:border-primary/50'
                  }`}
                  onClick={() => onModuleToggle(module)}
                  data-testid={`card-module-${module.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => onModuleToggle(module)}
                        data-testid={`checkbox-module-${module.id}`}
                      />
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`${module.icon} text-primary`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{module.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded">
                            📅 {module.duration}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded">
                            📍 {module.location}
                          </span>
                          {module.language && (
                            <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 rounded font-semibold">
                              🌐 {module.language}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-sm font-medium text-primary">+{formatPrice(price)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Other - Only show if other type is selected */}
        {quoteType === 'other' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.quote.configuration.other}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OTHER_MODULES.map((module) => {
              const isSelected = selectedModules.some(m => m.id === module.id);
              const price = isPublic ? module.pricePublic : module.pricePrivate;

              return (
                <div
                  key={module.id}
                  className={`module-card bg-card border-2 rounded-lg p-4 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:shadow-md hover:border-primary/50'
                  }`}
                  onClick={() => onModuleToggle(module)}
                  data-testid={`card-module-${module.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => onModuleToggle(module)}
                        data-testid={`checkbox-module-${module.id}`}
                      />
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className={`${module.icon} text-primary`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{module.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded">
                            📅 {module.duration}
                          </span>
                          <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded">
                            📍 {module.location}
                          </span>
                          {module.language && (
                            <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 rounded font-semibold">
                              🌐 {module.language}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-sm font-medium text-primary">+{formatPrice(price)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Training Modules */}
        {quoteType === 'cytometer' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.quote.configuration.trainingModules}</h3>
          {selectedCytometers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableModules.map((module) => {
                const isSelected = selectedModules.some(m => m.id === module.id);
                const price = isPublic ? module.pricePublic : module.pricePrivate;

                return (
                  <div
                    key={module.id}
                    className={`module-card bg-card border-2 rounded-lg p-4 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:shadow-md hover:border-primary/50'
                    }`}
                    onClick={() => onModuleToggle(module)}
                    data-testid={`card-module-${module.id}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => onModuleToggle(module)}
                          data-testid={`checkbox-module-${module.id}`}
                        />
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <i className={`${module.icon} text-primary`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{module.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded">
                              📅 {module.duration}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded">
                              📍 {module.location}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 rounded font-semibold">
                              🌐 {module.language}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="text-sm font-medium text-primary">+{formatPrice(price)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              {t.quote.configuration.selectCytometerFirst}
            </p>
          )}
        </div>
        )}

        {/* Additional Options */}
        {quoteType === 'cytometer' && selectedModules.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">{t.quote.configuration.additionalOptions}</h3>
          <div className="space-y-3">
            {availableOptions.map((option) => {
              const isSelected = selectedOptions.some(o => o.id === option.id);
              const price = isPublic ? option.pricePublic : option.pricePrivate;

              return (
                <div
                  key={option.id}
                  className={`flex items-center justify-between bg-card border rounded-lg p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:bg-muted/20'
                  }`}
                  onClick={() => onOptionToggle(option)}
                  data-testid={`card-option-${option.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onOptionToggle(option)}
                      data-testid={`checkbox-option-${option.id}`}
                    />
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary">+{formatPrice(price)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Number of Participants Selection */}
        {quoteType === 'cytometer' && selectedCytometers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              {t.quote.configuration.participants}
            </h3>
            <div className="bg-card border rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="participants" className="text-sm font-medium">
                    {t.quote.configuration.participantsLabel}
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="participants"
                      type="number"
                      min="1"
                      max={maxParticipants}
                      value={numberOfParticipants || ''}
                      onChange={(e) => {
                        const rawValue = e.target.value;
                        if (rawValue === '') {
                          onNumberOfParticipantsChange(1);
                          return;
                        }
                        const value = parseInt(rawValue, 10);
                        if (isNaN(value)) {
                          onNumberOfParticipantsChange(1);
                          return;
                        }
                        const clampedValue = Math.min(Math.max(value, 1), maxParticipants);
                        onNumberOfParticipantsChange(clampedValue);
                      }}
                      onBlur={(e) => {
                        // Ensure valid value on blur
                        const value = parseInt(e.target.value, 10);
                        if (isNaN(value) || value < 1) {
                          onNumberOfParticipantsChange(1);
                        }
                      }}
                      placeholder="1"
                      className="w-full"
                      data-testid="input-participants"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{t.quote.configuration.participantsMin}</span>
                  <span>{t.quote.configuration.participantsMax.replace('{{max}}', maxParticipants.toString())}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
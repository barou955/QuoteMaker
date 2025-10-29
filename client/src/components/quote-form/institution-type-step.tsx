import { Building, Hospital } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/i18n';

interface InstitutionTypeStepProps {
  institutionType: 'public' | 'private' | '';
  onSelect: (type: 'public' | 'private') => void;
}

export function InstitutionTypeStep({ institutionType, onSelect }: InstitutionTypeStepProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="bg-muted/30 rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">{t.quote.institutionType.title}</h2>
      <p className="text-muted-foreground text-center mb-8">
        {t.quote.institutionType.subtitle}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          className={`institution-type bg-card border-2 p-6 rounded-xl transition-all group ${
            institutionType === 'public'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary'
          }`}
          onClick={() => onSelect('public')}
          data-testid="button-institution-public"
        >
          <div className="text-center">
            <Hospital className="w-16 h-16 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">{t.quote.institutionType.public}</h3>
            <p className="text-muted-foreground">
              {t.quote.institutionType.publicDesc}
            </p>
            <div className="mt-4 text-sm text-primary font-medium">{t.quote.institutionType.publicPricing}</div>
          </div>
        </button>
        
        <button
          className={`institution-type bg-card border-2 p-6 rounded-xl transition-all group ${
            institutionType === 'private'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary'
          }`}
          onClick={() => onSelect('private')}
          data-testid="button-institution-private"
        >
          <div className="text-center">
            <Building className="w-16 h-16 text-accent mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-2">{t.quote.institutionType.private}</h3>
            <p className="text-muted-foreground">
              {t.quote.institutionType.privateDesc}
            </p>
            <div className="mt-4 text-sm text-accent font-medium">{t.quote.institutionType.privatePricing}</div>
          </div>
        </button>
      </div>
    </div>
  );
}

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/i18n';

interface CountryLanguageStepProps {
  countryLanguage: "FR" | "BNL" | "";
  onSelect: (countryLanguage: "FR" | "BNL") => void;
}

export function CountryLanguageStep({
  countryLanguage,
  onSelect,
}: CountryLanguageStepProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const countries = [
    {
      code: "FR" as const,
      name: t.quote.countryLanguage.france,
      description: t.quote.countryLanguage.franceDesc,
      flag: "FR",
    },
    {
      code: "BNL" as const,
      name: t.quote.countryLanguage.benelux,
      description: t.quote.countryLanguage.beneluxDesc,
      flag: "BENELUX",
    },
  ];

  return (
    <div className="bg-muted/30 rounded-xl p-8">
      <div className="text-center mb-8">
        <Globe className="w-16 h-16 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">{t.quote.countryLanguage.title}</h2>
        <p className="text-muted-foreground">
          {t.quote.countryLanguage.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {countries.map((country) => (
          <Button
            key={country.code}
            variant={countryLanguage === country.code ? "default" : "outline"}
            className={`h-auto p-6 flex flex-col items-center space-y-4 transition-all ${
              countryLanguage === country.code
                ? "ring-2 ring-primary bg-primary text-primary-foreground"
                : "hover:bg-muted/50 hover:border-primary/50 hover:text-foreground"
            }`}
            onClick={() => onSelect(country.code)}
            data-testid={`button-country-${country.code}`}
          >
            <div className="text-4xl mb-2">{country.flag}</div>
            <div className="text-center">
              <div className="font-semibold text-lg mb-1">{country.name}</div>
              <div className="text-sm opacity-80">{country.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}

import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/i18n';

interface ProgressStepsProps {
  currentStep: number;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const steps = [
    { number: 1, title: t.quote.steps.countryLanguage },
    { number: 2, title: t.quote.steps.institutionType },
    { number: 3, title: t.quote.steps.configuration },
    { number: 4, title: t.quote.steps.summary },
    { number: 5, title: t.quote.steps.quote },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`flex items-center space-x-2 ${
              index < steps.length - 1 ? 'step-indicator' : ''
            } ${currentStep >= step.number ? 'active' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= step.number
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.number}
            </div>
            <span className={`text-sm font-medium ${window.innerWidth < 640 && index > 0 ? 'hidden' : ''}`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

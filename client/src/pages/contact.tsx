
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/i18n';

export default function Contact() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">{t.contact.title}</h1>
          <div className="bg-card rounded-xl border border-border p-8">
            <p className="text-lg text-muted-foreground mb-6 text-center">
              {t.contact.subtitle}
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="font-semibold">{t.contact.email}:</span>
                <a href="mailto:formations@bd.com" className="text-primary hover:underline">
                  formations@bd.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <span className="font-semibold">{t.contact.phone}:</span>
                <a href="tel:+33123456789" className="text-primary hover:underline">
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

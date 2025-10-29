
import { Link } from "wouter";
import { Award, Headphones, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { useLanguage } from "@/contexts/language-context";

export default function Home() {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative py-20 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('https://i.ibb.co/DfzB1s0g/Flow-Cytometry-Category-Page-Banner.png')",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              {t.home.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {t.home.subtitle}
            </p>
            <Link href="/quote" data-testid="link-create-quote">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 shadow-lg"
              >
                {t.home.createQuote}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t.home.whyChoose}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.home.expertise50Years}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t.home.expertiseTitle}</h3>
              <p className="text-muted-foreground">
                {t.home.expertiseDesc}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {t.home.personalizedTitle}
              </h3>
              <p className="text-muted-foreground">
                {t.home.personalizedDesc}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t.home.supportTitle}</h3>
              <p className="text-muted-foreground">
                {t.home.supportDesc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

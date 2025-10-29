import { Link, useLocation } from 'wouter';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { useLanguage } from '@/contexts/language-context';

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = useTranslation(language);

  const navigation = [
    { name: t.header.home, href: '/' },
    { name: t.header.contact, href: '/contact' },
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" data-testid="link-logo">
              <img 
                src="https://i.ibb.co/7tD19vPY/bd1-logo.jpg" 
                alt="BD Logo" 
                className="h-20 w-auto"
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-xl font-medium transition-colors ${
                  location === item.href
                    ? 'text-primary'
                    : 'text-primary/70 hover:text-primary'
                }`}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
              data-testid="button-language-toggle"
            >
              <Globe className="w-4 h-4" />
              {language.toUpperCase()}
            </Button>
          </nav>
          
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-xl font-medium transition-colors ${
                    location === item.href
                      ? 'text-primary bg-muted'
                      : 'text-primary/70 hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 w-full"
                  data-testid="mobile-button-language-toggle"
                >
                  <Globe className="w-4 h-4" />
                  {language.toUpperCase()}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

import { Building, Mail, MapPin, Phone } from 'lucide-react';
import { SiLinkedin, SiX, SiYoutube } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">BD</h3>
            <p className="text-secondary-foreground/80 mb-4">
              Advancing the world of health™ depuis plus de 125 ans
            </p>
            <div className="flex space-x-4">
              <SiLinkedin className="w-5 h-5 text-secondary-foreground/60 hover:text-secondary-foreground cursor-pointer transition-colors" />
              <SiX className="w-5 h-5 text-secondary-foreground/60 hover:text-secondary-foreground cursor-pointer transition-colors" />
              <SiYoutube className="w-5 h-5 text-secondary-foreground/60 hover:text-secondary-foreground cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Formations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  BD FACSDiva™ Software
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  BD SpectralFX™ Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  BD CellView™ Image Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  BD Research Cloud
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Assistance technique
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Maintenance
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  Pièces détachées
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/80">
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                01 58 83 40 40
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                formation@bd.com
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Pont-de-Claix, France
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>&copy; 2024 Becton, Dickinson and Company. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

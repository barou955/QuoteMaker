import { QuoteData, Cytometer, TrainingModule, AdditionalOption } from '@/types/quote';
import type { Language } from '@/lib/i18n';

export interface QuoteCalculationResult {
  subtotal: number;
  discounts: {
    participantsDiscount: number;
    institutionDiscount: number;
    durationDiscount: number;
    totalDiscount: number;
  };
  total: number;
}

// Codes promo valides avec leur pourcentage de réduction
export const PROMO_CODES: { [key: string]: number } = {
  'BD2025': 0.10,      // 10% de réduction
  'FORMATION15': 0.15, // 15% de réduction
  'WELCOME20': 0.20,   // 20% de réduction
  'EARLY10': 0.10,     // 10% de réduction
  'PARTNER25': 0.25,   // 25% de réduction
  'VIP30': 0.30,       // 30% de réduction
  'SUMMER15': 0.15,    // 15% de réduction
  'CYTO20': 0.20,      // 20% de réduction
  'RESEARCH12': 0.12,  // 12% de réduction
  'CLINICAL18': 0.18,  // 18% de réduction
};

export function calculateInstitutionDiscount(institutionType: 'public' | 'private'): number {
  return institutionType === 'public' ? 0.10 : 0; // 10% pour institutions publiques
}

export function validatePromoCode(code: string): number {
  return PROMO_CODES[code.toUpperCase()] || 0;
}

export function calculateQuoteWithDiscounts(
  institutionType: 'public' | 'private',
  numberOfParticipants: number,
  cytometers: Cytometer[],
  modules: TrainingModule[],
  options: AdditionalOption[],
  promoCode?: string
): QuoteCalculationResult {
  const isPublic = institutionType === 'public';
  
  const cytometerTotal = cytometers.reduce((sum, cytometer) => {
    return sum + (isPublic ? cytometer.pricePublic : cytometer.pricePrivate);
  }, 0);
  
  const moduleTotal = modules.reduce((sum, module) => {
    return sum + (isPublic ? module.pricePublic : module.pricePrivate);
  }, 0);
  
  const optionTotal = options.reduce((sum, option) => {
    return sum + (isPublic ? option.pricePublic : option.pricePrivate);
  }, 0);
  
  const subtotal = cytometerTotal + moduleTotal + optionTotal;
  
  // Calcul des réductions
  const institutionDiscountRate = calculateInstitutionDiscount(institutionType);
  const promoDiscountRate = promoCode ? validatePromoCode(promoCode) : 0;
  
  const institutionDiscount = subtotal * institutionDiscountRate;
  const promoDiscount = subtotal * promoDiscountRate;
  
  const totalDiscount = institutionDiscount + promoDiscount;
  const total = subtotal - totalDiscount;
  
  return {
    subtotal,
    discounts: {
      participantsDiscount: 0,
      institutionDiscount,
      durationDiscount: promoDiscount,
      totalDiscount,
    },
    total: Math.max(total, 0),
  };
}

export function calculateQuoteTotal(
  institutionType: 'public' | 'private',
  cytometers: Cytometer[],
  modules: TrainingModule[],
  options: AdditionalOption[],
  numberOfParticipants: number = 1,
  promoCode?: string
): number {
  const result = calculateQuoteWithDiscounts(
    institutionType,
    numberOfParticipants,
    cytometers,
    modules,
    options,
    promoCode
  );
  return result.total;
}

export function generateQuoteNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  return `BD-${year}${month}-${random}`;
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString('fr-FR')}€`;
}

export function generateAutomaticComments(
  countryLanguage: 'FR' | 'BNL',
  institutionType: 'public' | 'private',
  numberOfParticipants: number,
  cytometers: Cytometer[],
  modules: TrainingModule[],
  options: AdditionalOption[],
  discounts: QuoteCalculationResult['discounts'],
  language?: Language
): string {
  const comments: string[] = [];
  const isPublic = institutionType === 'public';
  // Utiliser la langue de l'interface si fournie, sinon se baser sur le pays
  const isFrench = language ? language === 'fr' : countryLanguage === 'FR';
  
  // Commentaire d'introduction basé sur la sélection
  if (cytometers.length === 1) {
    const cytometer = cytometers[0];
    if (isFrench) {
      comments.push(`Formation spécialisée sur ${cytometer.name} - ${cytometer.description}.`);
    } else {
      comments.push(`Specialized training on ${cytometer.name} - ${cytometer.description} (adapted to the Belgian market).`);
    }
  } else if (cytometers.length > 1) {
    const expertCount = cytometers.filter(c => c.level === 'Expert').length;
    const advancedCount = cytometers.filter(c => c.level === 'Avancé').length;
    
    if (expertCount > 0 && advancedCount > 0) {
      if (isFrench) {
        comments.push(`Programme de formation multi-instruments combinant des technologies avancées et expertes.`);
      } else {
        comments.push(`Multi-instrument training program combining advanced and expert technologies.`);
      }
    } else if (expertCount > 0) {
      if (isFrench) {
        comments.push(`Formation experte sur ${cytometers.length} instruments de niveau expert.`);
      } else {
        comments.push(`Expert training on ${cytometers.length} expert-level instruments.`);
      }
    } else {
      if (isFrench) {
        comments.push(`Formation multi-instruments sur ${cytometers.length} systèmes BD.`);
      } else {
        comments.push(`Multi-instrument training on ${cytometers.length} BD systems.`);
      }
    }
  }
  
  // Commentaires sur les modules spécialisés
  if (modules.length > 0) {
    const moduleNames = modules.map(m => m.name);
    if (moduleNames.some(name => name.includes('Spectral'))) {
      comments.push('Inclut une formation avancée sur les technologies spectrales BD SpectralFX™.');
    }
    if (moduleNames.some(name => name.includes('CellView'))) {
      comments.push('Formation à l\'imagerie cellulaire temps réel avec BD CellView™.');
    }
    if (moduleNames.some(name => name.includes('Tri Cellulaire'))) {
      comments.push('Module spécialisé en techniques de tri cellulaire haute vitesse.');
    }
    if (moduleNames.some(name => name.includes('Panel'))) {
      comments.push('Optimisation de panels multicolores jusqu\'à 50 couleurs.');
    }
  }
  
  // Commentaires sur le nombre de participants
  if (numberOfParticipants === 1) {
    comments.push('Formation individuelle personnalisée avec support technique dédié.');
  } else if (numberOfParticipants <= 3) {
    comments.push(`Formation en petit groupe (${numberOfParticipants} participants) pour un apprentissage optimal.`);
  } else if (numberOfParticipants <= 8) {
    comments.push(`Formation en groupe de ${numberOfParticipants} participants avec exercices pratiques renforcés.`);
  } else {
    comments.push(`Formation de groupe élargie (${numberOfParticipants} participants) avec support pédagogique adapté.`);
  }
  
  // Commentaires sur les options
  if (options.length > 0) {
    if (options.some(o => o.id === 'onsite')) {
      comments.push('Formation sur site dans vos locaux avec votre équipement.');
    }
    if (options.some(o => o.id === 'certification')) {
      comments.push('Certification officielle BD incluse avec badge numérique.');
    }
    if (options.some(o => o.id === 'remote-support')) {
      comments.push('Support technique à distance 6 mois post-formation inclus.');
    }
    if (options.some(o => o.id === 'advanced-materials')) {
      comments.push('Kit de formation avancé avec documentation complète et réactifs d\'entraînement.');
    }
  }
  
  // Commentaires sur les réductions appliquées
  if (discounts.totalDiscount > 0) {
    const discountReasons: string[] = [];
    if (discounts.institutionDiscount > 0) {
      if (isFrench) {
        discountReasons.push('tarif préférentiel établissement public (10%)');
      } else {
        discountReasons.push('preferential public institution rate (10%)');
      }
    }
    if (discounts.durationDiscount > 0) {
      if (isFrench) {
        discountReasons.push('code promotionnel appliqué');
      } else {
        discountReasons.push('promotional code applied');
      }
    }
    
    if (discountReasons.length > 0) {
      if (isFrench) {
        comments.push(`Tarification optimisée avec ${discountReasons.join(', ')}.`);
      } else {
        comments.push(`Optimized pricing with ${discountReasons.join(', ')}.`);
      }
    }
  }
  
  // Commentaire sur le type d'institution
  if (isPublic) {
    if (isFrench) {
      comments.push('Tarifs préférentiels appliqués pour les établissements publics et de recherche.');
    } else {
      comments.push('Preferential rates applied for public and research institutions.');
    }
  } else {
    if (isFrench) {
      comments.push('Formation adaptée aux besoins des entreprises privées et laboratoires commerciaux.');
    } else {
      comments.push('Training adapted to the needs of private companies and commercial laboratories.');
    }
  }
  
  // Commentaire de clôture selon le pays
  if (isFrench) {
    comments.push('Formation dispensée par les experts BD France avec support technique français.');
  } else {
    comments.push('Training delivered by BD Benelux experts with English technical support.');
  }
  
  return comments.join(' ');
}

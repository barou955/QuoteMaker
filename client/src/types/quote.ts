export interface Cytometer {
  id: string;
  name: string;
  description: string;
  pricePublic: number;
  pricePrivate: number;
  duration: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
  maxParticipants: number;
  availableLocations: string[];
  deepLink?: string;
}

export interface TrainingModule {
  id: string;
  name: string;
  description: string;
  pricePublic: number;
  pricePrivate: number;
  icon: string;
  compatibleCytometers: string[];
  duration: string;
  location: string;
  deepLink?: string;
  label?: string;
  language?: 'FR' | 'EN'; // Added language property
}

export interface AdditionalOption {
  id: string;
  name: string;
  description: string;
  pricePublic: number;
  pricePrivate: number;
  duration?: string;
  location?: string;
  deepLink?: string;
  compatibleModules?: string[];
  language?: 'FR' | 'EN'; // Added language property
}

export interface ContactInfo {
  title: 'Madame' | 'Monsieur';
  name: string;
  email: string;
  institution: string;
  address: string;
  phone?: string;
}

export interface QuoteData {
  countryLanguage: 'FR' | 'BNL';
  institutionType: 'public' | 'private';
  selectedCytometers: Cytometer[];
  selectedModules: TrainingModule[];
  selectedOptions: AdditionalOption[];
  selectedLocation: string;
  numberOfParticipants: number;
  contactInfo: ContactInfo;
  totalPrice: number;
  originalPrice: number;
  discountAmount: number;
  automaticComments: string;
}

// Available training locations by country
export const LOCATIONS_FR = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux', 'Lille', 'Nantes', 'Strasbourg', 'BD Rungis', 'Sur site', 'Distanciel'];
export const LOCATIONS_BNL = ['Bruxelles', 'Anvers', 'Gand', 'Liège', 'Namur', 'Bruges', 'BD Erembodegen', 'Remote'];

// ============= CATALOGUE FRANCE (FR) =============

// Instruments FR - Basés sur CSV lignes FR
export const CYTOMETERS_FR: Cytometer[] = [
  // Groupe 1: Canto, A1, A3, A5, X20, Fortessa, Celesta, LSR (lignes 1-2, 7)
  {
    id: 'canto',
    name: 'BD FACSCanto™',
    description: 'Analyseur piloté par le logiciel BD FACSDiva™',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Intermédiaire',
    maxParticipants: 12,
    availableLocations: ['Distanciel', 'BD Rungis', 'Sur site'],
  },
  {
    id: 'facsymphony-a1',
    name: 'BD FACSymphony™ A1',
    description: 'Analyseur jusqu\'à 16 couleurs',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Intermédiaire',
    maxParticipants: 12,
    availableLocations: ['Distanciel', 'BD Rungis', 'Sur site'],
  },
  {
    id: 'facsymphony-a3',
    name: 'BD FACSymphony™ A3',
    description: 'Système haute-paramétrisation jusqu\'à 30 paramètres',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Avancé',
    maxParticipants: 12,
    availableLocations: ['Distanciel', 'BD Rungis', 'Sur site'],
  },
  {
    id: 'facsymphony-a5',
    name: 'BD FACSymphony™ A5',
    description: 'Analyse jusqu\'à 50 paramètres simultanés',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Avancé',
    maxParticipants: 12,
    availableLocations: ['Distanciel', 'BD Rungis', 'Sur site'],
  },
  {
    id: 'lsrfortessa-x20',
    name: 'BD LSRFortessa™ X-20',
    description: 'Analyseur configurable haute-paramétrisation',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Avancé',
    maxParticipants: 12,
    availableLocations: ['Distanciel', 'BD Rungis', 'Sur site'],
  },
  {
    id: 'facscelesta',
    name: 'BD FACSCelesta™',
    description: 'Analyseur multicolore de paillasse',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Intermédiaire',
    maxParticipants: 12,
    availableLocations: ['Distanciel', 'BD Rungis', 'Sur site'],
  },
  {
    id: 'lsr',
    name: 'BD LSR™',
    description: 'Analyseur LSR',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Intermédiaire',
    maxParticipants: 12,
    availableLocations: ['Distanciel', 'BD Rungis', 'Sur site'],
  },
  // Ligne 8: A5 SE (formation spectrale virtuelle)
  {
    id: 'facsymphony-a5-se',
    name: 'BD FACSymphony™ A5 SE',
    description: 'Système spectral avancé',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Avancé',
    maxParticipants: 12,
    availableLocations: ['BD Rungis', 'Sur site'],
  },
  // Lignes 14-15: Lyric
  {
    id: 'facslyric',
    name: 'BD FACSLyric™',
    description: 'Analyseur clinique hautement sensible',
    pricePublic: 3460,
    pricePrivate: 3460,
    duration: '4j',
    level: 'Avancé',
    maxParticipants: 12,
    availableLocations: ['Distanciel', 'BD Rungis', 'Sur site'],
  },
  // Ligne 19: Duet
  {
    id: 'facsduet',
    name: 'BD FACSDuet™',
    description: 'Système de préparation automatique',
    pricePublic: 1480,
    pricePrivate: 1480,
    duration: '1j',
    level: 'Intermédiaire',
    maxParticipants: 12,
    availableLocations: ['Sur site'],
  },
  // Ligne 21: LWA
  {
    id: 'lwa',
    name: 'BD FACS™ Lyse Wash Assistant',
    description: 'Assistant de lavage et lyse',
    pricePublic: 300,
    pricePrivate: 300,
    duration: '0.5j',
    level: 'Débutant',
    maxParticipants: 15,
    availableLocations: ['Distanciel'],
  },
  // Ligne 23: Aria Family
  {
    id: 'facsaria-family',
    name: 'BD FACSAria™ Family',
    description: 'Trieur haute sensibilité',
    pricePublic: 4380,
    pricePrivate: 4380,
    duration: '3j',
    level: 'Expert',
    maxParticipants: 8,
    availableLocations: ['Sur site'],
  },
  // Lignes 28-29: Melody
  {
    id: 'facsmelody',
    name: 'BD FACSMelody™',
    description: 'Trieur compact de paillasse',
    pricePublic: 2920,
    pricePrivate: 2920,
    duration: '2j',
    level: 'Intermédiaire',
    maxParticipants: 8,
    availableLocations: ['Sur site'],
  },
  // Ligne 31: FACSDiscover S8 (Note: pas de formation FR officielle, utilise EU)
  {
    id: 'facsdiscover-s8',
    name: 'BD FACSDiscover™ S8',
    description: 'Système spectral de tri',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4j',
    level: 'Expert',
    maxParticipants: 8,
    availableLocations: ['BD Rungis', 'Sur site'],
  },
  // Ligne 33: FACSDiscover A8
  {
    id: 'facsdiscover-a8',
    name: 'BD FACSDiscover™ A8',
    description: 'Système spectral d\'analyse',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4j',
    level: 'Expert',
    maxParticipants: 8,
    availableLocations: ['BD Rungis', 'Sur site'],
  },
];

// Modules de formation FR
export const TRAINING_MODULES_FR: TrainingModule[] = [
  // Ligne 1: Formation classique FACSDiva
  {
    id: 'module-fr-1',
    name: 'Formation - analyseurs pilotés par le logiciel BD FACSDiva™',
    description: 'Formation complète sur les analyseurs BD FACSDiva™',
    pricePublic: 3460,
    pricePrivate: 3460,
    icon: 'fas fa-microscope',
    compatibleCytometers: ['canto', 'facsymphony-a1', 'facsymphony-a3', 'facsymphony-a5', 'lsrfortessa-x20', 'facscelesta', 'lsr'],
    duration: '4j',
    location: 'Distanciel (J1) + BD Rungis (J2-4)',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3dfef28bce-abb5-456b-943d-1a0b0f9d033d',
    label: 'classical'
  },
  // Ligne 2: Formation essentielle
  {
    id: 'module-fr-2',
    name: 'Formation recherche - Instruments BD FACSDiva™ Essentiel',
    description: 'Formation essentielle sur site',
    pricePublic: 1480,
    pricePrivate: 1480,
    icon: 'fas fa-graduation-cap',
    compatibleCytometers: ['canto', 'facsymphony-a1', 'facsymphony-a3', 'facsymphony-a5', 'lsrfortessa-x20', 'facscelesta', 'lsr'],
    duration: '1j',
    location: 'Sur site',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d38b786ce-2700-4697-86aa-8dc32d505953',
    label: 'Essential'
  },
  // Lignes 3-5 EU: Modules de formation EU disponibles pour clients FR
  {
    id: 'module-eu-3-fr',
    name: 'BD FACSDiva™ Software training (EN)',
    description: 'Formation essentielle en anglais à distance',
    pricePublic: 1000,
    pricePrivate: 1000,
    icon: 'fas fa-microscope',
    compatibleCytometers: ['canto', 'facsymphony-a1', 'facsymphony-a3', 'facsymphony-a5', 'lsrfortessa-x20', 'facscelesta', 'lsr'],
    duration: '1.5j',
    location: 'Distanciel',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d73d728c1-5b0c-4619-abca-ccb87e673459',
    label: 'Essential'
  },
  {
    id: 'module-eu-4-fr',
    name: 'Advanced BD FACSDiva™ Software training (EN)',
    description: 'Formation avancée en anglais à distance',
    pricePublic: 500,
    pricePrivate: 500,
    icon: 'fas fa-graduation-cap',
    compatibleCytometers: ['canto', 'facsymphony-a1', 'facsymphony-a3', 'facsymphony-a5', 'lsrfortessa-x20', 'facscelesta', 'lsr'],
    duration: '1.5j',
    location: 'Distanciel',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d6ccff64d-caab-4149-abda-9fc9e6bb4719',
    label: 'Advanced'
  },
  {
    id: 'module-eu-5-fr',
    name: 'Operator Training - BD LSRFortessa & BD FACSymphony (EN)',
    description: 'Formation opérateur complète en anglais',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-user-cog',
    compatibleCytometers: ['facsymphony-a1', 'facsymphony-a3', 'facsymphony-a5', 'lsrfortessa-x20', 'facscelesta', 'lsr'],
    duration: '4.5j',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d2ad812da-fa16-416a-90bf-e73c693d2f25',
    label: 'classical'
  },
  // Ligne 7: High Throughput Sampler
  {
    id: 'module-fr-7',
    name: 'Formation recherche - BD™ High Throughput Sampler',
    description: 'Formation sur l\'échantillonneur à haut débit',
    pricePublic: 300,
    pricePrivate: 300,
    icon: 'fas fa-tachometer-alt',
    compatibleCytometers: ['canto', 'facsymphony-a1', 'facsymphony-a3', 'facsymphony-a5', 'lsrfortessa-x20', 'facscelesta', 'lsr'],
    duration: '0.5j',
    location: 'Distanciel',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d2019bbf8-5d67-444e-ae51-ac4015ec2f19',
    label: 'classical'
  },
  // Ligne 14: BD FACSLyric FR
  {
    id: 'module-fr-14',
    name: 'Formation - BD FACSLyric™',
    description: 'Formation complète sur le BD FACSLyric™',
    pricePublic: 3460,
    pricePrivate: 3460,
    icon: 'fas fa-flask',
    compatibleCytometers: ['facslyric'],
    duration: '4j',
    location: 'Distanciel (J1) + BD Rungis (J2-4)',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3ded6d477c-74fe-411c-ac5b-9695dff83b9a',
    label: 'classical'
  },
  // Ligne 15: BD FACSLyric routine FR
  {
    id: 'module-fr-15',
    name: 'Formation - BD FACSLyric™ routine',
    description: 'Formation routine essentielle',
    pricePublic: 1480,
    pricePrivate: 1480,
    icon: 'fas fa-clipboard-check',
    compatibleCytometers: ['facslyric'],
    duration: '1j',
    location: 'Sur site',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3dbb00c079-a6a2-4e94-a89e-e3b9f29f0a9d',
    label: 'Essential'
  },
  // Lignes 16-18 EU: Modules FACSLyric EU disponibles pour clients FR
  {
    id: 'module-eu-16-fr',
    name: 'Operator Training - BD FACSLyric (EN)',
    description: 'Formation opérateur en anglais',
    pricePublic: 1000,
    pricePrivate: 1000,
    icon: 'fas fa-flask',
    compatibleCytometers: ['facslyric'],
    duration: '1j',
    location: 'BD Erembodegen ou Distanciel',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d0ffd04c3-2f4b-4b26-83ef-b4ff7cf4463a',
    label: 'Essential'
  },
  {
    id: 'module-eu-17-fr',
    name: 'Assay development module - BD FACSLyric™ (EN)',
    description: 'Module développement d\'essais en anglais',
    pricePublic: 500,
    pricePrivate: 500,
    icon: 'fas fa-vial',
    compatibleCytometers: ['facslyric'],
    duration: '1j',
    location: 'BD Erembodegen ou Distanciel',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d672c1c18-5504-499f-a697-4be662e932b6',
    label: 'Advanced'
  },
  {
    id: 'module-eu-18-fr',
    name: 'Operator training with assay development - BD FACSLyric (EN)',
    description: 'Formation opérateur avec développement d\'essais en anglais',
    pricePublic: 1500,
    pricePrivate: 1500,
    icon: 'fas fa-flask',
    compatibleCytometers: ['facslyric'],
    duration: '2j',
    location: 'BD Erembodegen ou Distanciel',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d1ab68704-d004-49b6-84b1-ac222f53ea72',
    label: 'classical'
  },
  // Ligne 19: BD FACSDuet FR
  {
    id: 'module-fr-19',
    name: 'Formation clinique - BD FACSDuet™',
    description: 'Formation sur le système de préparation automatique',
    pricePublic: 1480,
    pricePrivate: 1480,
    icon: 'fas fa-robot',
    compatibleCytometers: ['facsduet'],
    duration: '1j',
    location: 'Sur site',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d22b92b16-e6f8-4eba-b485-945994b884a4',
    label: 'classical'
  },
  // Ligne 20 EU: Module FACSDuet EU disponible pour clients FR
  {
    id: 'module-eu-20-fr',
    name: 'Operator Training - BD FACSDuet (EN)',
    description: 'Formation opérateur en anglais',
    pricePublic: 1500,
    pricePrivate: 1500,
    icon: 'fas fa-robot',
    compatibleCytometers: ['facsduet'],
    duration: '3j',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d587ef24b-3dd0-4620-9ffb-84b859dd1f4d',
    label: 'classical'
  },
  // Ligne 21: LWA FR
  {
    id: 'module-fr-21',
    name: 'Formation clinique - BD FACS™ Lyse Wash Assistant',
    description: 'Formation sur l\'assistant de lavage',
    pricePublic: 300,
    pricePrivate: 300,
    icon: 'fas fa-flask',
    compatibleCytometers: ['lwa'],
    duration: '0.5j',
    location: 'Distanciel',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3de7c437af-a9e5-46fe-a3d9-8ff6f468788a',
    label: 'classical'
  },
  // Ligne 23: BD FACSAria FR
  {
    id: 'module-fr-23',
    name: 'Formation recherche - BD FACSAria™',
    description: 'Formation complète sur le trieur',
    pricePublic: 4380,
    pricePrivate: 4380,
    icon: 'fas fa-sort',
    compatibleCytometers: ['facsaria-family'],
    duration: '3j',
    location: 'Sur site',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d5ff00e21-fca8-41c7-abea-0f1c90c7fa21',
    label: 'classical'
  },
  // Lignes 24-26 EU: Modules Aria EU disponibles pour clients FR
  {
    id: 'module-eu-24-fr',
    name: 'Operator Course Level A - BD FACSAria Family (EN)',
    description: 'Formation opérateur niveau A en anglais',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-sort',
    compatibleCytometers: ['facsaria-family'],
    duration: '3.5j',
    location: 'BD Erembodegen (3j) & Distanciel (0.5j)',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3def0f26d6-3f2f-4847-9728-b43646636e12',
    label: 'classical'
  },
  {
    id: 'module-eu-25-fr',
    name: 'Operator Course Level B - BD FACSAria Family (EN)',
    description: 'Formation opérateur niveau B en anglais',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-sort',
    compatibleCytometers: ['facsaria-family'],
    duration: '3.5j',
    location: 'BD Erembodegen (3j) & Distanciel (0.5j)',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d8cee2266-c5a0-44f4-9b27-68c051b97c08',
    label: 'classical'
  },
  {
    id: 'module-eu-26-fr',
    name: 'Advanced operator training - BD FACSAria Family (EN)',
    description: 'Formation opérateur avancée en anglais',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-sort',
    compatibleCytometers: ['facsaria-family'],
    duration: '3.5j',
    location: 'BD Erembodegen (3j) & Distanciel (0.5j)',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d8e340313-73c7-443f-8d55-5316e1a62cc6',
    label: 'Advanced'
  },
  // Ligne 28: BD FACSMelody FR
  {
    id: 'module-fr-28',
    name: 'Formation recherche - BD FACSMelody™',
    description: 'Formation complète sur le trieur BD FACSMelody™',
    pricePublic: 2920,
    pricePrivate: 2920,
    icon: 'fas fa-music',
    compatibleCytometers: ['facsmelody'],
    duration: '2j',
    location: 'Sur site',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d26c5240a-462e-46e8-b6c2-c9eec6d2c4e1',
    label: 'classical'
  },
  // Ligne 29: BD FACSMelody Essentiel FR
  {
    id: 'module-fr-29',
    name: 'Formation recherche - BD FACSMelody™ Essentiel',
    description: 'Formation essentielle sur le trieur',
    pricePublic: 1480,
    pricePrivate: 1480,
    icon: 'fas fa-music',
    compatibleCytometers: ['facsmelody'],
    duration: '1j',
    location: 'Sur site',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3de9b9458e-2f7f-453c-b446-6d96894d245d',
    label: 'Essential'
  },
  // Ligne 30 EU: Module Melody EU disponible pour clients FR
  {
    id: 'module-eu-30-fr',
    name: 'Operator Training - BD FACSMelody™ (EN)',
    description: 'Formation opérateur en anglais',
    pricePublic: 1800,
    pricePrivate: 1800,
    icon: 'fas fa-music',
    compatibleCytometers: ['facsmelody'],
    duration: '2j',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d2ad812da-fa16-416a-90bf-e73c693d2f25',
    label: 'classical'
  },
  // Lignes 31, 33 EU: Modules FACSDiscover S8 et A8 (uniquement EU disponibles)
  {
    id: 'module-eu-31-fr',
    name: 'Operator Course - BD FACSDiscover S8 (EN)',
    description: 'Formation opérateur sur le système spectral de tri',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-wave-square',
    compatibleCytometers: ['facsdiscover-s8'],
    duration: '4j',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d74c21dcf-d53b-4a70-97e4-1ffeb13ae7b9',
    label: 'classical'
  },
  {
    id: 'module-eu-33-fr',
    name: 'Operator Course - BD FACSDiscover A8 (EN)',
    description: 'Formation opérateur sur le système spectral d\'analyse',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-wave-square',
    compatibleCytometers: ['facsdiscover-a8'],
    duration: '4j',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: '',
    label: 'classical'
  },
];

// Logiciels FR (pour le type de devis "logiciel")
export const SOFTWARE_MODULES_FR: TrainingModule[] = [
  // Ligne 12: FlowJo maîtrise
  {
    id: 'software-fr-12',
    name: 'Formation Recherche - FlowJo™ maîtrise du logiciel',
    description: 'Maîtrise complète de FlowJo™',
    pricePublic: 500,
    pricePrivate: 500,
    icon: 'fas fa-chart-line',
    compatibleCytometers: [],
    duration: '2j',
    location: 'Distanciel',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3df1b57864-0466-4fe6-991a-679d562531c7',
    label: 'classical'
  },
  // Ligne 13: FlowJo analyses non supervisées
  {
    id: 'software-fr-13',
    name: 'Formation Recherche - FlowJo™ analyses non supervisées',
    description: 'Analyses avancées non supervisées',
    pricePublic: 1000,
    pricePrivate: 1000,
    icon: 'fas fa-project-diagram',
    compatibleCytometers: [],
    duration: '4j',
    location: 'Distanciel',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d98d17f4d-6a41-418a-89f9-c2d1010c9058',
    label: 'Advanced'
  },
  // Ligne 22: Workflow Manager
  {
    id: 'software-fr-22',
    name: 'Formation clinique - BD FACS™ Workflow Manager',
    description: 'Gestion des workflows',
    pricePublic: 240,
    pricePrivate: 240,
    icon: 'fas fa-tasks',
    compatibleCytometers: [],
    duration: '0.5j',
    location: 'Sur site',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d35afb97e-eef9-4940-b458-913faecade5e',
    label: 'classical'
  },
];

// Autres formations FR (pour le type de devis "autre")
export const OTHER_MODULES_FR: TrainingModule[] = [
  // Ligne 9: Multicouleur
  {
    id: 'other-fr-9',
    name: 'Formation Recherche - multicouleur',
    description: 'Formation avancée cytométrie multicouleur',
    pricePublic: 1730,
    pricePrivate: 1730,
    icon: 'fas fa-palette',
    compatibleCytometers: [],
    duration: '2j',
    location: 'BD Rungis',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d05087d82-d63c-4226-8f6c-3264870fcde3',
    label: 'option'
  },
  // Ligne 11: Technologies spectrales
  {
    id: 'other-fr-11',
    name: 'Formation Recherche - technologies spectrales',
    description: 'Formation sur les technologies spectrales',
    pricePublic: 2595,
    pricePrivate: 2595,
    icon: 'fas fa-wave-square',
    compatibleCytometers: [],
    duration: '3j',
    location: 'BD Rungis',
    language: 'FR',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d0072919d-213f-4714-93cd-76898e3d3ce8',
    label: 'option'
  },
];

// Logiciels EU
export const SOFTWARE_MODULES_EU: TrainingModule[] = [];

// Autres formations EU
export const OTHER_MODULES_EU: TrainingModule[] = [
  // Ligne 10: Multicolor flow cytometry virtual training
  {
    id: 'other-eu-10',
    name: 'Multicolor flow cytometry virtual training',
    description: 'Virtual multicolor flow cytometry training',
    pricePublic: 1200,
    pricePrivate: 1200,
    icon: 'fas fa-palette',
    compatibleCytometers: [],
    duration: '2d',
    location: 'Remote',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3dc8080232-7e55-44a8-9da5-7621f95c0d15',
    label: 'option'
  },
];

// Formations complémentaires FR
export const ADDITIONAL_OPTIONS_FR: AdditionalOption[] = [
  // Ligne 6 EU: Troubleshooting Training
  {
    id: 'option-eu-6-fr',
    name: 'Troubleshooting Training - BD FACSymphony, BD LSRFortessa X-20 (EN)',
    description: 'Formation dépannage en anglais',
    pricePublic: 2400,
    pricePrivate: 2400,
    duration: '2j',
    location: 'BD Erembodegen',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d1c6ba78e-0aff-4412-8d6b-68e2052fe4c4',
    compatibleModules: ['module-fr-1', 'module-fr-2', 'module-eu-3-fr', 'module-eu-4-fr', 'module-eu-5-fr'],
    language: 'EN'
  },
  // Ligne 7: High Throughput Sampler
  {
    id: 'option-fr-7',
    name: 'Formation recherche - BD™ High Throughput Sampler',
    description: 'Formation sur l\'échantillonneur à haut débit',
    pricePublic: 300,
    pricePrivate: 300,
    duration: '0.5j',
    location: 'Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d2019bbf8-5d67-444e-ae51-ac4015ec2f19',
    compatibleModules: ['module-fr-1', 'module-fr-2', 'module-eu-3-fr', 'module-eu-4-fr', 'module-eu-5-fr'],
    language: 'FR'
  },
  // Ligne 8 EU: Spectral Flow Cytometry Virtual Training
  {
    id: 'option-eu-8-fr',
    name: 'Spectral Flow Cytometry Virtual Training for BD FACSDiva™ (EN)',
    description: 'Formation virtuelle cytométrie spectrale en anglais',
    pricePublic: 1200,
    pricePrivate: 1200,
    duration: '2j',
    location: 'Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3ded827ad2-99c3-4844-a6da-8a0783e1005e',
    compatibleModules: ['module-fr-1', 'module-fr-2', 'module-eu-3-fr', 'module-eu-4-fr', 'module-eu-5-fr'],
    language: 'EN'
  },
  // Ligne 9: Multicouleur
  {
    id: 'option-fr-9',
    name: 'Formation Recherche - multicouleur',
    description: 'Formation avancée cytométrie multicouleur',
    pricePublic: 1730,
    pricePrivate: 1730,
    duration: '2j',
    location: 'BD Rungis',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d05087d82-d63c-4226-8f6c-3264870fcde3',
    compatibleModules: ['module-fr-1', 'module-fr-2', 'module-eu-3-fr', 'module-eu-4-fr', 'module-eu-5-fr'],
    language: 'FR'
  },
  // Ligne 10 EU: Multicolor flow cytometry virtual training
  {
    id: 'option-eu-10-fr',
    name: 'Multicolor flow cytometry virtual training (EN)',
    description: 'Formation virtuelle cytométrie multicouleur en anglais',
    pricePublic: 1200,
    pricePrivate: 1200,
    duration: '2j',
    location: 'Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3dc8080232-7e55-44a8-9da5-7621f95c0d15',
    compatibleModules: ['module-fr-1', 'module-fr-2', 'module-eu-3-fr', 'module-eu-4-fr', 'module-eu-5-fr'],
    language: 'EN'
  },
  // Ligne 11: Technologies spectrales
  {
    id: 'option-fr-11',
    name: 'Formation Recherche - technologies spectrales',
    description: 'Formation sur les technologies spectrales',
    pricePublic: 2595,
    pricePrivate: 2595,
    duration: '3j',
    location: 'BD Rungis',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d0072919d-213f-4714-93cd-76898e3d3ce8',
    compatibleModules: ['module-fr-1', 'module-fr-2', 'module-eu-3-fr', 'module-eu-4-fr', 'module-eu-5-fr'],
    language: 'FR'
  },
  // Ligne 12: FlowJo maîtrise
  {
    id: 'option-fr-12',
    name: 'Formation Recherche - FlowJo™ maîtrise du logiciel',
    description: 'Maîtrise complète de FlowJo™',
    pricePublic: 500,
    pricePrivate: 500,
    duration: '2j',
    location: 'Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3df1b57864-0466-4fe6-991a-679d562531c7',
    compatibleModules: ['module-fr-1', 'module-fr-2', 'module-eu-3-fr', 'module-eu-4-fr', 'module-eu-5-fr'],
    language: 'FR'
  },
  // Ligne 13: FlowJo analyses non supervisées
  {
    id: 'option-fr-13',
    name: 'Formation Recherche - FlowJo™ analyses non supervisées',
    description: 'Analyses avancées non supervisées',
    pricePublic: 1000,
    pricePrivate: 1000,
    duration: '4j',
    location: 'Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d98d17f4d-6a41-418a-89f9-c2d1010c9058',
    compatibleModules: ['module-fr-1', 'module-fr-2', 'module-eu-3-fr', 'module-eu-4-fr', 'module-eu-5-fr'],
    language: 'FR'
  },
  // Ligne 17 EU: Assay development module
  {
    id: 'option-eu-17-fr',
    name: 'Assay development module - BD FACSLyric™ (EN)',
    description: 'Module développement d\'essais en anglais',
    pricePublic: 500,
    pricePrivate: 500,
    duration: '1j',
    location: 'BD Erembodegen ou Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d672c1c18-5504-499f-a697-4be662e932b6',
    compatibleModules: ['module-fr-14', 'module-fr-15', 'module-eu-16-fr', 'module-eu-18-fr'],
    language: 'EN'
  },
  // Ligne 19: BD FACSDuet
  {
    id: 'option-fr-19',
    name: 'Formation clinique - BD FACSDuet™',
    description: 'Formation sur le système de préparation automatique',
    pricePublic: 1480,
    pricePrivate: 1480,
    duration: '1j',
    location: 'Sur site',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d22b92b16-e6f8-4eba-b485-945994b884a4',
    compatibleModules: ['module-fr-14', 'module-fr-15', 'module-eu-16-fr', 'module-eu-17-fr', 'module-eu-18-fr'],
    language: 'FR'
  },
  // Ligne 21: LWA
  {
    id: 'option-fr-21',
    name: 'Formation clinique - BD FACS™ Lyse Wash Assistant',
    description: 'Formation sur l\'assistant de lavage',
    pricePublic: 300,
    pricePrivate: 300,
    duration: '0.5j',
    location: 'Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3de7c437af-a9e5-46fe-a3d9-8ff6f468788a',
    compatibleModules: ['module-fr-14', 'module-fr-15', 'module-eu-16-fr', 'module-eu-17-fr', 'module-eu-18-fr'],
    language: 'FR'
  },
  // Ligne 22: Workflow Manager
  {
    id: 'option-fr-22',
    name: 'Formation clinique - BD FACS™ Workflow Manager',
    description: 'Gestion des workflows',
    pricePublic: 240,
    pricePrivate: 240,
    duration: '0.5j',
    location: 'Sur site',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eJv3EjEG9gRU9J3HyXNsNf9%2bjpuKC%2fQHkRLbHlElPHQo%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d35afb97e-eef9-4940-b458-913faecade5e',
    compatibleModules: ['module-fr-14', 'module-fr-15', 'module-eu-16-fr', 'module-eu-17-fr', 'module-eu-18-fr'],
    language: 'FR'
  },
  // Ligne 27 EU: Best practices for Sorting
  {
    id: 'option-eu-27-fr',
    name: 'Best practices for Sorting (EN)',
    description: 'Meilleures pratiques de tri en anglais',
    pricePublic: 1200,
    pricePrivate: 1200,
    duration: '2j',
    location: 'Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3dbc3c2f0d-6be8-4893-ad82-2154b7cc9d2f',
    compatibleModules: ['module-fr-23', 'module-eu-24-fr', 'module-eu-25-fr', 'module-eu-26-fr'],
    language: 'EN'
  },
  // Ligne 32: Formation virtuelle cytométrie spectrale pour BD FACSChorus
  {
    id: 'option-eu-32-fr',
    name: 'Spectral flow cytometry virtual training for BD FACSChorus™ (EN)',
    description: 'Formation virtuelle cytométrie spectrale pour BD FACSChorus™',
    pricePublic: 1200,
    pricePrivate: 1200,
    duration: '2j',
    location: 'Distanciel',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d08e1781d-3c92-4b5d-8eb2-c8b5de493eab',
    compatibleModules: ['module-eu-31-fr', 'module-eu-33-fr'],
    language: 'EN'
  },
];

// ============= CATALOGUE BENELUX (EU) =============

// Instruments EU
export const CYTOMETERS_EU: Cytometer[] = [
  // Lignes 3-5: Canto, A1, A3, A5, X20, Fortessa, Celesta, LSR
  {
    id: 'canto-eu',
    name: 'BD FACSCanto™',
    description: 'Analyzer driven by BD FACSDiva™',
    pricePublic: 1000,
    pricePrivate: 1000,
    duration: '1.5d',
    level: 'Beginner',
    maxParticipants: 12,
    availableLocations: ['Remote', 'BD Erembodegen'],
  },
  {
    id: 'facsymphony-a1-eu',
    name: 'BD FACSymphony™ A1',
    description: 'Analyzer up to 16 colors',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4.5d',
    level: 'Intermediate',
    maxParticipants: 12,
    availableLocations: ['BD Erembodegen'],
  },
  {
    id: 'facsymphony-a3-eu',
    name: 'BD FACSymphony™ A3',
    description: 'High-parameter system',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4.5d',
    level: 'Advanced',
    maxParticipants: 12,
    availableLocations: ['BD Erembodegen'],
  },
  {
    id: 'facsymphony-a5-eu',
    name: 'BD FACSymphony™ A5',
    description: 'Analysis up to 50 parameters',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4.5d',
    level: 'Advanced',
    maxParticipants: 12,
    availableLocations: ['BD Erembodegen'],
  },
  {
    id: 'lsrfortessa-x20-eu',
    name: 'BD LSRFortessa™ X-20',
    description: 'Configurable analyzer',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4.5d',
    level: 'Advanced',
    maxParticipants: 12,
    availableLocations: ['BD Erembodegen'],
  },
  {
    id: 'facscelesta-eu',
    name: 'BD FACSCelesta™',
    description: 'Multicolor analyzer',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4.5d',
    level: 'Intermediate',
    maxParticipants: 12,
    availableLocations: ['BD Erembodegen'],
  },
  {
    id: 'lsr-eu',
    name: 'BD LSR™',
    description: 'LSR analyzer',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4.5d',
    level: 'Intermediate',
    maxParticipants: 12,
    availableLocations: ['BD Erembodegen'],
  },
  // Ligne 16: Lyric
  {
    id: 'facslyric-eu',
    name: 'BD FACSLyric™',
    description: 'Clinical analyzer',
    pricePublic: 1000,
    pricePrivate: 1000,
    duration: '1d',
    level: 'Intermediate',
    maxParticipants: 12,
    availableLocations: ['BD Erembodegen', 'Remote'],
  },
  // Ligne 20: Duet
  {
    id: 'facsduet-eu',
    name: 'BD FACSDuet™',
    description: 'Automatic sample preparation system',
    pricePublic: 1500,
    pricePrivate: 1500,
    duration: '3d',
    level: 'Intermediate',
    maxParticipants: 12,
    availableLocations: ['BD Erembodegen'],
  },
  // Lignes 24-26: Aria Family
  {
    id: 'facsaria-family-eu',
    name: 'BD FACSAria™ Family',
    description: 'High sensitivity sorter',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '3.5d',
    level: 'Expert',
    maxParticipants: 8,
    availableLocations: ['BD Erembodegen', 'Remote'],
  },
  // Ligne 30: Melody
  {
    id: 'facsmelody-eu',
    name: 'BD FACSMelody™',
    description: 'Compact benchtop sorter',
    pricePublic: 1800,
    pricePrivate: 1800,
    duration: '2d',
    level: 'Intermediate',
    maxParticipants: 8,
    availableLocations: ['BD Erembodegen'],
  },
  // Lignes 31,33: S8 et A8
  {
    id: 'facsdiscover-s8-eu',
    name: 'BD FACSDiscover™ S8',
    description: 'Spectral sorter system',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4d',
    level: 'Expert',
    maxParticipants: 8,
    availableLocations: ['BD Erembodegen'],
  },
  {
    id: 'facsdiscover-a8-eu',
    name: 'BD FACSDiscover™ A8',
    description: 'Spectral analyzer system',
    pricePublic: 3600,
    pricePrivate: 3600,
    duration: '4d',
    level: 'Expert',
    maxParticipants: 8,
    availableLocations: ['BD Erembodegen'],
  },
];

// Modules de formation EU
export const TRAINING_MODULES_EU: TrainingModule[] = [
  // Ligne 3: BD FACSDiva Software training (Essential)
  {
    id: 'module-eu-3',
    name: 'BD FACSDiva™ Software training',
    description: 'Essential training on BD FACSDiva™',
    pricePublic: 1000,
    pricePrivate: 1000,
    icon: 'fas fa-microscope',
    compatibleCytometers: ['canto-eu', 'facsymphony-a1-eu', 'facsymphony-a3-eu', 'facsymphony-a5-eu', 'lsrfortessa-x20-eu', 'facscelesta-eu', 'lsr-eu'],
    duration: '1.5d',
    location: 'Remote',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d73d728c1-5b0c-4619-abca-ccb87e673459',
    label: 'Essential'
  },
  // Ligne 4: Advanced BD FACSDiva Software training
  {
    id: 'module-eu-4',
    name: 'Advanced BD FACSDiva™ Software training',
    description: 'Advanced training on BD FACSDiva™',
    pricePublic: 500,
    pricePrivate: 500,
    icon: 'fas fa-graduation-cap',
    compatibleCytometers: ['canto-eu', 'facsymphony-a1-eu', 'facsymphony-a3-eu', 'facsymphony-a5-eu', 'lsrfortessa-x20-eu', 'facscelesta-eu', 'lsr-eu'],
    duration: '1.5d',
    location: 'Remote',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d6ccff64d-caab-4149-abda-9fc9e6bb4719',
    label: 'Advanced'
  },
  // Ligne 5: Operator Training
  {
    id: 'module-eu-5',
    name: 'Operator Training (BD FACSymphony, BD LSRFortessa)',
    description: 'Complete operator training',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-user-cog',
    compatibleCytometers: ['facsymphony-a1-eu', 'facsymphony-a3-eu', 'facsymphony-a5-eu', 'lsrfortessa-x20-eu', 'facscelesta-eu', 'lsr-eu'],
    duration: '4.5d',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d2ad812da-fa16-416a-90bf-e73c693d2f25',
    label: 'classical'
  },
  // Ligne 16: Operator Training BD FACSLyric
  {
    id: 'module-eu-16',
    name: 'Operator Training (BD FACSLyric)',
    description: 'BD FACSLyric™ operator training',
    pricePublic: 1000,
    pricePrivate: 1000,
    icon: 'fas fa-flask',
    compatibleCytometers: ['facslyric-eu'],
    duration: '1d',
    location: 'BD Erembodegen or Remote',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d0ffd04c3-2f4b-4b26-83ef-b4ff7cf4463a',
    label: 'Essential'
  },
  // Ligne 17: Assay development module
  {
    id: 'module-eu-17',
    name: 'Assay development module (BD FACSLyric™)',
    description: 'Assay development module',
    pricePublic: 500,
    pricePrivate: 500,
    icon: 'fas fa-vial',
    compatibleCytometers: ['facslyric-eu'],
    duration: '1d',
    location: 'BD Erembodegen or Remote',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d672c1c18-5504-499f-a697-4be662e932b6',
    label: 'Advanced'
  },
  // Ligne 18: Operator training with assay development
  {
    id: 'module-eu-18',
    name: 'Operator training with assay development (BD FACSLyric)',
    description: 'Operator training with development',
    pricePublic: 1500,
    pricePrivate: 1500,
    icon: 'fas fa-flask',
    compatibleCytometers: ['facslyric-eu'],
    duration: '2d',
    location: 'BD Erembodegen or Remote',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d1ab68704-d004-49b6-84b1-ac222f53ea72',
    label: 'classical'
  },
  // Ligne 20: Operator Training BD FACSDuet
  {
    id: 'module-eu-20',
    name: 'Operator Training (BD FACSDuet)',
    description: 'BD FACSDuet™ operator training',
    pricePublic: 1500,
    pricePrivate: 1500,
    icon: 'fas fa-robot',
    compatibleCytometers: ['facsduet-eu'],
    duration: '3d',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d587ef24b-3dd0-4620-9ffb-84b859dd1f4d',
    label: 'classical'
  },
  // Ligne 24: Operator Course Level A (Aria)
  {
    id: 'module-eu-24',
    name: 'Operator Course Level A (BD FACSAria Family)',
    description: 'Level A operator training',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-sort',
    compatibleCytometers: ['facsaria-family-eu'],
    duration: '3.5d',
    location: 'BD Erembodegen (3d) & Remote (0.5d)',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3def0f26d6-3f2f-4847-9728-b43646636e12',
    label: 'classical'
  },
  // Ligne 25: Operator Course Level B (Aria)
  {
    id: 'module-eu-25',
    name: 'Operator Course Level B (BD FACSAria Family)',
    description: 'Level B operator training',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-sort',
    compatibleCytometers: ['facsaria-family-eu'],
    duration: '3.5d',
    location: 'BD Erembodegen (3d) & Remote (0.5d)',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d8cee2266-c5a0-44f4-9b27-68c051b97c08',
    label: 'classical'
  },
  // Ligne 26: Advanced operator training (Aria)
  {
    id: 'module-eu-26',
    name: 'Advanced operator training (BD FACSAria Family)',
    description: 'Advanced operator training',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-sort',
    compatibleCytometers: ['facsaria-family-eu'],
    duration: '3.5d',
    location: 'BD Erembodegen (3d) & Remote (0.5d)',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d8e340313-73c7-443f-8d55-5316e1a62cc6',
    label: 'Advanced'
  },
  // Ligne 30: Operator Training BD FACSMelody
  {
    id: 'module-eu-30',
    name: 'Operator Training (BD FACSMelody™)',
    description: 'BD FACSMelody™ operator training',
    pricePublic: 1800,
    pricePrivate: 1800,
    icon: 'fas fa-music',
    compatibleCytometers: ['facsmelody-eu'],
    duration: '2d',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d2ad812da-fa16-416a-90bf-e73c693d2f25',
    label: 'classical'
  },
  // Ligne 31: Operator Course BD FACSDiscover S8
  {
    id: 'module-eu-31',
    name: 'Operator Course (BD FACSDiscover S8)',
    description: 'BD FACSDiscover S8 operator training',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-wave-square',
    compatibleCytometers: ['facsdiscover-s8-eu'],
    duration: '4d',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d74c21dcf-d53b-4a70-97e4-1ffeb13ae7b9',
    label: 'classical'
  },
  // Ligne 33: Operator Course BD FACSDiscover A8
  {
    id: 'module-eu-33',
    name: 'Operator Course (BD FACSDiscover A8)',
    description: 'BD FACSDiscover A8 operator training',
    pricePublic: 3600,
    pricePrivate: 3600,
    icon: 'fas fa-wave-square',
    compatibleCytometers: ['facsdiscover-a8-eu'],
    duration: '4d',
    location: 'BD Erembodegen',
    language: 'EN',
    deepLink: '',
    label: 'classical'
  },
];

// Formations complémentaires EU
export const ADDITIONAL_OPTIONS_EU: AdditionalOption[] = [
  // Ligne 6: Troubleshooting Training
  {
    id: 'option-eu-6',
    name: 'Troubleshooting Training (BD FACSymphony, BD LSRFortessa X-20)',
    description: 'Troubleshooting training',
    pricePublic: 2400,
    pricePrivate: 2400,
    duration: '2d',
    location: 'BD Erembodegen',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d1c6ba78e-0aff-4412-8d6b-68e2052fe4c4',
    compatibleModules: ['module-eu-3', 'module-eu-4', 'module-eu-5'],
    language: 'EN'
  },
  // Ligne 8: Spectral Flow Cytometry Virtual Training
  {
    id: 'option-eu-8',
    name: 'Spectral Flow Cytometry Virtual Training for BD FACSDiva™ Software users',
    description: 'Virtual spectral flow cytometry training',
    pricePublic: 1200,
    pricePrivate: 1200,
    duration: '2d',
    location: 'Remote',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3ded827ad2-99c3-4844-a6da-8a0783e1005e',
    compatibleModules: ['module-eu-3', 'module-eu-4', 'module-eu-5'],
    language: 'EN'
  },
  // Ligne 10: Multicolor flow cytometry virtual training
  {
    id: 'option-eu-10',
    name: 'Multicolor flow cytometry virtual training',
    description: 'Virtual multicolor flow cytometry training',
    pricePublic: 1200,
    pricePrivate: 1200,
    duration: '2d',
    location: 'Remote',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3dc8080232-7e55-44a8-9da5-7621f95c0d15',
    compatibleModules: ['module-eu-3', 'module-eu-4', 'module-eu-5'],
    language: 'EN'
  },
  // Ligne 27: Best practices for Sorting
  {
    id: 'option-eu-27',
    name: 'Best practices for Sorting',
    description: 'Best practices for sorting',
    pricePublic: 1200,
    pricePrivate: 1200,
    duration: '2d',
    location: 'Remote',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3dbc3c2f0d-6be8-4893-ad82-2154b7cc9d2f',
    compatibleModules: ['module-eu-24', 'module-eu-25', 'module-eu-26'],
    language: 'EN'
  },
  // Ligne 32: Spectral flow cytometry virtual training for BD FACSChorus
  {
    id: 'option-eu-32',
    name: 'Spectral flow cytometry virtual training for BD FACSChorus™ instrument users',
    description: 'Virtual spectral flow cytometry training for BD FACSChorus™',
    pricePublic: 1200,
    pricePrivate: 1200,
    duration: '2d',
    location: 'Remote',
    deepLink: 'https://bdfacsuniversity.csod.com/default.aspx?p=bdfacsuniversity&c=%5e%5e%5eI9EaGYTOoYTdEihubEGoWXWb4ALzxUYuH7NMHtmOrQM%3d&dlink=%2fDeepLink%2fProcessRedirect.aspx%3fmodule%3dlodetails%26lo%3d08e1781d-3c92-4b5d-8eb2-c8b5de493eab',
    compatibleModules: ['module-eu-31', 'module-eu-33'],
    language: 'EN'
  },
];

// Export unified arrays based on country
export function getCytometersByCountry(country: 'FR' | 'BNL'): Cytometer[] {
  return country === 'FR' ? CYTOMETERS_FR : CYTOMETERS_EU;
}

export function getTrainingModulesByCountry(country: 'FR' | 'BNL'): TrainingModule[] {
  return country === 'FR' ? TRAINING_MODULES_FR : TRAINING_MODULES_EU;
}

export function getSoftwareModulesByCountry(country: 'FR' | 'BNL'): TrainingModule[] {
  return country === 'FR' ? SOFTWARE_MODULES_FR : SOFTWARE_MODULES_EU;
}

export function getOtherModulesByCountry(country: 'FR' | 'BNL'): TrainingModule[] {
  return country === 'FR' ? OTHER_MODULES_FR : OTHER_MODULES_EU;
}

export function getAdditionalOptionsByCountry(country: 'FR' | 'BNL'): AdditionalOption[] {
  return country === 'FR' ? ADDITIONAL_OPTIONS_FR : ADDITIONAL_OPTIONS_EU;
}

// Legacy exports for backward compatibility
export const CYTOMETERS = CYTOMETERS_FR;
export const TRAINING_MODULES = TRAINING_MODULES_FR;
export const ADDITIONAL_OPTIONS = ADDITIONAL_OPTIONS_FR;
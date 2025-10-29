# Cytometry BD Quote Generator

## Overview

This is a comprehensive quote generation application for BD (Becton Dickinson) cytometry training services. The system allows users to configure training packages for cytometer instruments, select training modules and additional options, and generate professional PDF quotes. The application targets both public and private institutions with differentiated pricing structures.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### Major Update - December 2025
- **Complete Cytometer Portfolio**: Full BD 2025 product line with 14 authentic instruments including:
  - Clinical Analyzers: BD FACSLyric™, BD FACSDuet™
  - Research Analyzers: BD FACSDiscover™ A8, BD FACSCelesta™, BD LSRFortessa™, BD FACSymphony™ A1/A3/A5, BD Accuri™ C6 Plus
  - Cell Sorters: BD FACSDiscover™ S8, BD FACSAria™ III/Fusion, BD FACSMelody™, BD FACSymphony™ S6

- **Enhanced Training Modules**: Added authentic BD software and technology training:
  - BD FACSDiva™ Software (complete workflow solution)
  - BD SpectralFX™ Technology (spectral unmixing)
  - BD CellView™ Image Technology (real-time imaging)
  - BD Research Cloud (cloud-based collaboration)
  - Panel Design and Cell Sorting advanced modules

- **Visual Branding**: Updated colors and design to match official BD Biosciences website
- **Enhanced Options**: Added certification, remote support, and advanced materials packages

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript in SPA (Single Page Application) mode
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS styling
- **State Management**: React hooks for local state, TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form management
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Build Process**: Vite for frontend bundling, esbuild for server bundling

### Data Storage Solutions
- **Current Implementation**: In-memory storage using Map data structure for development/demo purposes
- **Database Schema**: Drizzle ORM with PostgreSQL schema definitions ready for production deployment
- **Database Provider**: Configured for Neon Database (@neondatabase/serverless)
- **Migration System**: Drizzle Kit for database schema migrations

### Authentication and Authorization Mechanisms
- **Current State**: No authentication implemented - open access system
- **Session Management**: Configuration present for connect-pg-simple sessions (currently unused)
- **Security**: Basic input validation through Zod schemas

### Application Flow
1. **Institution Type Selection**: Users select between public/private institution for pricing differentiation
2. **Configuration Step**: Multi-select interface for cytometers, training modules, and additional options
3. **Contact Information**: Form collection with validation for quote recipient details
4. **Quote Generation**: PDF generation using PDFKit with professional formatting
5. **Quote Storage**: Persistence of quote data with auto-generated quote numbers

### Pricing Architecture
- **Dual Pricing Model**: Separate pricing for public institutions (preferential rates) and private institutions (standard rates)
- **Dynamic Calculation**: Real-time price updates based on selected items and institution type
- **Quote Numbering**: Auto-generated format: BD-YYYYMM-######

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack Query for modern React patterns
- **Routing**: Wouter for lightweight client-side navigation
- **Validation**: Zod for runtime type validation and schema definition

### UI and Styling Dependencies
- **Component Library**: Radix UI primitives (@radix-ui/*) providing accessible, unstyled components
- **Styling**: Tailwind CSS with class-variance-authority for component variants
- **Icons**: Lucide React for consistent iconography, react-icons for brand icons
- **Utilities**: clsx and tailwind-merge for conditional class names

### Database and ORM Dependencies
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM with Drizzle Kit for migrations
- **Connection**: @neondatabase/serverless driver optimized for serverless environments

### Development and Build Dependencies
- **Development Server**: Vite with React plugin and runtime error overlay
- **TypeScript**: Full TypeScript support with strict configuration
- **Build Tools**: esbuild for server bundling, PostCSS with Autoprefixer
- **Development Tools**: Replit-specific plugins for development environment integration

### Utility Dependencies
- **Date Handling**: date-fns for date manipulation and formatting
- **PDF Generation**: PDFKit for server-side PDF document creation
- **Carousel**: Embla Carousel React for image/content carousels
- **Command Menu**: cmdk for command palette functionality
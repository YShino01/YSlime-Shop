# YSlime - SlimeVR Tracker E-commerce Platform

## Overview

YSlime is a premium e-commerce platform for SlimeVR full-body tracking solutions. The application features an animated brand introduction, horizontal product slider showcasing different tracker packages (5-9 trackers), a product gallery, and accessories section. Built with a dark-mode-first design using sky blue accents to create a tech-forward, gaming aesthetic.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, configured with custom aliases for clean imports
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **Framer Motion** for complex animations including intro sequence and page transitions

**UI Component Library**
- **shadcn/ui** components based on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom dark theme configuration
- Uses "new-york" style variant with dark mode as default
- Custom color system built on HSL values with CSS variables for theme consistency

**State Management**
- **TanStack Query (React Query)** for server state management and data fetching
- Component-level state with React hooks for UI interactions
- No global state management library (Redux, Zustand) - keeps state close to components

**Animation Strategy**
- Multi-stage intro animation sequence (~4-5 seconds):
  1. Y-logo fade-in
  2. "Slime" text appears
  3. Logo moves horizontally to connect
  4. Combined brand moves to header position
  5. Product section fades in
- Uses `layoutId` for shared element transitions between intro and header

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- ESM (ECMAScript Modules) throughout the codebase
- Custom logging middleware for API request tracking

**API Design**
- RESTful endpoint structure (currently single endpoint: `/api/products`)
- Returns consolidated product data including packages, accessories, and gallery images
- In-memory data storage via `MemStorage` class (no database persistence yet)

**Data Layer**
- **Storage Interface Pattern**: `IStorage` interface allows switching between storage implementations
- Currently uses `MemStorage` for in-memory data
- Configured for future PostgreSQL integration via Drizzle ORM (schema defined but not actively used)

### Data Storage Solutions

**Current Implementation**
- In-memory storage with hardcoded product data in `server/storage.ts`
- Data includes:
  - Tracker packages (5, 6, 7, 8, 9 tracker configurations)
  - Three gyroscope types with different pricing tiers
  - Accessories (straps and chargers with Shopee links)
  - Gallery image placeholders

**Planned Database Integration**
- **Drizzle ORM** configured for PostgreSQL (via `@neondatabase/serverless`)
- Schema defined in `shared/schema.ts` using Zod for validation
- Database configuration present but not actively used
- Migration system ready via `drizzle-kit`

**Why this approach?**
- Allows rapid prototyping without database setup
- Storage interface makes it easy to swap to database later
- Keeps data structure validated via Zod schemas shared between client and server

### External Dependencies

**Database (Configured, Not Active)**
- **Neon Serverless Postgres** - Modern serverless PostgreSQL provider
- Connection via `@neondatabase/serverless` driver
- Requires `DATABASE_URL` environment variable when activated

**Third-Party Services**
- **Shopee** - E-commerce platform for accessory purchases (links stored in product data)
- **Discord** - Social/community links (referenced in pre-order popup UI)
- No payment processing integrated (pre-order system uses external links)

**Development Tools**
- **Replit-specific plugins**:
  - `@replit/vite-plugin-runtime-error-modal` - Enhanced error display
  - `@replit/vite-plugin-cartographer` - Code navigation
  - `@replit/vite-plugin-dev-banner` - Development indicators
- Google Fonts (Inter) loaded via CDN for typography

**Key NPM Packages**
- `express` + `tsx` for server runtime
- `react` + `react-dom` for UI
- `@tanstack/react-query` for data fetching
- `framer-motion` for animations
- `drizzle-orm` + `drizzle-zod` for future database operations
- `wouter` for routing
- Complete Radix UI component suite for accessible primitives
- `tailwindcss` + `autoprefixer` for styling

**Design System**
- Custom Tailwind configuration with:
  - Dark mode as default theme
  - Sky blue (`#38bdf8`) as primary brand color
  - Custom border radius values (9px, 6px, 3px)
  - CSS variable-based color system for easy theming
  - Hover and active state elevation utilities
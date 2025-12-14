# TweetForge - AI-Powered Viral Tweet Generator

## Overview

TweetForge is a web application that generates viral, engaging tweets using AI. Users enter a topic or idea, and the application leverages the Lyzr AI API to craft optimized tweets for maximum Twitter/X engagement. The app features a landing page with marketing content and a generator page where users create tweets.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing (two main routes: `/` landing page, `/generate` generator page)
- **State Management**: TanStack React Query for server state and async operations
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Theming**: Custom theme provider supporting light/dark mode with CSS variables

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript compiled with tsx for development, esbuild for production
- **API Structure**: Single REST endpoint `/api/generate` that proxies requests to Lyzr AI
- **Static Serving**: Express serves the built React app in production mode

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM (schema defined but minimally used)
- **Current Storage**: In-memory storage implementation exists for user data
- **Schema**: Simple users table with id, username, and password fields

### Key Design Decisions
1. **Lyzr AI Integration**: Tweet generation is handled entirely by the Lyzr AI API rather than a custom model. This simplifies development but requires proper API key configuration.
2. **Monorepo Structure**: Client and server code coexist in a single repository with shared types in `/shared`
3. **Path Aliases**: TypeScript path aliases (`@/` for client, `@shared/` for shared code) for clean imports
4. **Component Library**: Full shadcn/ui installation provides consistent, accessible UI components

### Build System
- Development: Vite dev server with HMR, proxied through Express
- Production: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`

## External Dependencies

### AI Service
- **Lyzr AI API**: Primary AI service for tweet generation
  - Endpoint: `https://agent-prod.studio.lyzr.ai/v3/inference/chat/`
  - Required environment variables: `LYZR_API_KEY`, `LYZR_USER_ID`, `LYZR_AGENT_ID`, `LYZR_SESSION_ID`

### Database
- **PostgreSQL**: Required for Drizzle ORM (configure via `DATABASE_URL` environment variable)

### Key NPM Packages
- `@tanstack/react-query`: Async state management
- `drizzle-orm` + `drizzle-zod`: Database ORM with Zod schema integration
- `framer-motion`: Animation library
- `wouter`: Client-side routing
- `zod`: Runtime type validation
- Full Radix UI primitive set via shadcn/ui components
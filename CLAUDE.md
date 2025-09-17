# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack markdown editor application for the NCDC frontend challenge. The project consists of:

- **Backend**: NestJS application with SQLite database and Swagger API documentation
- **Frontend**: React + TypeScript + Vite application with Cloudflare Pages deployment
- **Swagger**: Orval-generated API client from OpenAPI specification

## Architecture

### Monorepo Structure
- Uses pnpm workspaces for frontend and swagger packages
- Backend is managed separately due to pnpm compatibility issues with NestJS
- Root package.json provides workspace-level build commands

### API Integration
- Backend exposes Swagger documentation at `http://localhost:3000/api`
- Frontend consumes API through generated TypeScript client in `swagger/` directory
- Orval generates React Query hooks and TypeScript types from `swagger.yaml`

### Database
- SQLite database for development with TypeORM migrations
- Initial data provided via `data/bk-dev.sqlite` backup

## Common Development Commands

### Root Level
```bash
pnpm build                    # Build all workspace packages
```

### Backend (NestJS)
```bash
cd backend
npm install                   # Install dependencies
npm run migration:run         # Run database migrations
npm run build                 # Build the application
npm run start                 # Start production server
npm run start:dev             # Start development server with watch mode
npm run lint                  # Lint TypeScript files
npm run test                  # Run unit tests
npm run test:e2e              # Run end-to-end tests
npm run format               # Format code with Prettier

# Database management
npm run migration:generate -n <name>  # Generate new migration
cp ./data/bk-dev.sqlite ./data/dev.sqlite  # Reset database to initial state
```

### Frontend (React + Vite)
```bash
cd frontend
npm run dev                   # Start development server
npm run build                 # Build for production
npm run lint                  # Lint and fix code
npm run format               # Format code
npm run preview              # Preview production build locally
npm run deploy               # Build and deploy to Cloudflare Pages
npm run cf-typegen           # Generate Cloudflare Worker types
```

### Swagger API Client
```bash
cd swagger
npm run build                 # Generate API client from swagger.yaml using Orval
```

## Key Technical Constraints

### Validation Rules
- **Page Title**: 1-50 characters
- **Page Content**: 10-2000 characters

### Testing Requirements
- At least one test is mandatory
- Backend includes Jest unit and e2e test configurations
- Frontend testing setup should follow React testing best practices

### Node Version
- Backend requires Node.js >=22 and npm >=10

## Development Workflow

1. Start backend API server first
2. Generate/update API client if backend changes
3. Start frontend development server
4. Use Swagger UI at `http://localhost:3000/api` for API exploration

## Important Files

- `swagger/swagger.yaml` - OpenAPI specification
- `swagger/orval.config.js` - API client generation configuration
- `backend/ormconfig.ts` - TypeORM database configuration
- `pnpm-workspace.yaml` - Workspace package definitions
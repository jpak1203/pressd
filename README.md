# Pressd

Pressd is a React + TypeScript music-tracking app where users can create an account, sign in, and browse a personalized music discovery home feed.

## Tech stack

- React 19
- TypeScript
- Vite 7
- React Router 7
- Chakra UI 3
- Supabase JS
- Vitest + Testing Library

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (recommended)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file at `.env.local`:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

These variables are required by [`src/lib/supabase/client.ts`](/Users/jujubeguud/Documents/projects/web/pressd/src/lib/supabase/client.ts).

## Run the app

```bash
npm run dev
```

Then open the URL printed by Vite (usually `http://localhost:5173`).

## Available scripts

- `npm run dev`: start development server
- `npm run build`: type-check and build for production
- `npm run preview`: preview the production build locally
- `npm run lint`: run ESLint
- `npm run lint:fix`: run ESLint with auto-fixes
- `npm run test`: run tests once (Vitest)
- `npm run test:watch`: run tests in watch mode

## Environment setup

- Required variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- These are used by [`src/lib/supabase/client.ts`](/Users/jujubeguud/Documents/projects/web/pressd/src/lib/supabase/client.ts).

## Code quality

- `npm run lint`: run ESLint checks across the codebase
- `npm run lint:fix`: apply safe lint auto-fixes
- `npm run test`: execute unit/component tests with Vitest
- `npm run test:watch`: run tests in watch mode during development

## Project structure

```text
src/
  app/                  # App shell, providers, and route components
  components/           # Shared UI components (navbar, footer, wrappers)
  features/
    landing-page/       # Marketing landing page UI and data
    home-page/          # Signed-in home feed experience
    user-auth/          # Authentication feature area
  lib/
    supabase/           # Supabase client setup
  test/                 # Test setup
```

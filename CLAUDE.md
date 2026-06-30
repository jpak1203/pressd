# Project: pressd

**Pressd** is a Letterboxd-style music tracking app where users log, rate, review, and discover music. Built with React 19 + TypeScript + Vite 7 + Supabase + Spotify API.

---

## Implementation Status

### Built

- User auth (signup, signin, signout, guest anonymous sessions)
- Spotify search via Supabase Edge Function proxy (debounced, 3-column results), runtime-validated with zod (`src/services/spotify/schemas.ts`)
- Detail pages for tracks, albums, artists (hero, metadata, Spotify link); artist detail includes a discography section (`DiscographySection` + `useArtistDiscography`, backed by the `spotify-discography` edge function) and albums show their track list (`spotify-album-tracks`)
- **Interactions persisted to Supabase** (rating, like, listened, want-to-listen, reviews) via `usePersistInteractions` → `profileApi`. Each action also writes a `diary` row. Guests (no profile) keep interactions in-memory only — every mutator is a no-op.
- User profile page (`/profile/:username`): hero, rating bar graph, stats, top 5 (with edit modal), diary activity feed, ratings list, edit-profile modal
- Landing page (guest CTA) and authenticated home page (static placeholder data)
- NavBar with search, Footer, layout wrapper, protected routes
- Chakra UI 3 dark theme with custom design tokens
- Browse pages for tracks, albums, playlists, members (`/tracks`, `/albums`, `/playlists`, `/members`) and matching search pages (`/{kind}/search`) — tracks/albums share a parameterized implementation in `src/features/items/`
- Decade filter (functional) and gated rating/popularity filters (UI-only, marked "Coming Soon") on browse/search pages

### Backend ready, frontend not wired

These have Supabase tables + `profileApi` functions but no UI consuming them yet:

- **Follow system** — `follows` table + `followUser`/`unfollowUser`/`fetchFollowers`/`fetchFollowing`/`isFollowing` exist; no follow button/list in any component.
- **Playlist authoring** — `playlists`/`playlist_items`/`tags`/`playlist_tags` tables + `createPlaylist`/`addPlaylistItem`/`updatePlaylist`/etc. exist; `/playlists` browse still falls back to seed data and there is no create/edit UI.

### Not Yet Built

- Standalone diary page/route (`/diary`) — diary rows are written and surfaced on the profile, but there is no dedicated activity-log page
- Tagging/hashtag UI for playlists (tables exist; no UI)
- Paginated search results / Load More wiring
- Rating + popularity filters on tracks/albums (currently gated)
- Time-frame filter on `/playlists/search` (currently gated)
- Featured/curated content (weekly rotation)
- Discovery/recommendation engine

---

## Code Style

- TypeScript strict mode, no `any` types
- Named exports only, no default exports
- `@/` path alias for all non-relative imports (maps to `src/`)
- Co-located tests next to source files (e.g., `useUserAuthForm.test.tsx`)

---

## Architecture

### Folder Structure

```
src/
  app/             # App shell: routing (App.tsx), theme (theme.ts), route pages
    routes/        # Page-level route components
  components/      # Shared UI components (NavBar, SearchBar, Footer, item-filter-bar, popular-items-module, etc.)
  features/        # Feature modules with components/, hooks/, types/, data/, api/
    detail/        # Track/album/artist detail pages, interactions, discography
    profile/       # Profile page (hero, rating graph, top 5, diary feed) + profileApi (all Supabase table I/O)
    home-page/     # Authenticated user dashboard
    items/         # Shared browse/search experience for tracks + albums (parameterized on ItemKind)
    tracks/        # Track-specific seed data (consumed by features/items)
    albums/        # Album-specific seed data (consumed by features/items)
    playlists/     # Playlist browse/search components, hooks, seed data
    members/       # Members browse/search components, hooks
    landing-page/  # Guest landing page
    search-results/# Spotify search UI
    user-auth/     # Auth forms, context, validation
  lib/             # supabase/ client init, errorToast
  services/spotify/# Spotify edge-function client (service.ts), types, zod schemas (schemas.ts)
  test/            # Test setup (Vitest + Testing Library)
```

New features: `src/features/{feature-name}/` with subdirectories as needed.

### Tracks + albums share a parameterized implementation

`/tracks`, `/tracks/search`, `/albums`, `/albums/search` are all served by **two** components in `src/features/items/`, dispatched by a `kind: 'track' | 'album'` prop wired in `App.tsx`:

- `ItemBrowsePage` — featured row + recently reviewed row + popular-this-week list + filter bar (filter selection navigates to `/{kind}/search?...`)
- `ItemSearchPage` — search input + filter bar + `ItemList` (heading reflects query/filter state)

Behind these:

- `useItemList({ kind, filters, fallback })` — wraps `useSpotifySearch` with the right `type`, maps Spotify items to `TrackDetail | AlbumDetail`, applies the decade filter, falls back to seed data when query is empty
- `ItemList` — single row component dispatched on `item.type` (uses `<AlbumLink>` for albums, `<Link>` for tracks)
- Per-kind seed data lives in `src/features/{tracks,albums}/data/{tracks,albums}Data.ts`

To support a new browse-able item kind, extend `ItemKind` and the lookup tables in `ItemBrowsePage`/`ItemSearchPage`/`useItemList`. **Do not duplicate pages.** Playlists is intentionally separate because its data shape (`PlaylistSearchResult`) and grid layout differ.

### Filter bar

`src/components/item-filter-bar/ItemFilterBar.tsx` is a shared three-group filter (Release / Rating / Popularity). Types and URL-param parsers live next to it in `types.ts`. Rating + popularity groups are currently rendered as **disabled "Coming Soon"** because the underlying data isn't wired yet — only `decade` actually filters. To enable them, wire support into `useItemList` and remove the `disabled` flag in `ItemFilterBar`.

The playlists time-frame filter (`MemberTimeFilterPills` reused on `/playlists/search`) is similarly gated via a `disabled` prop until `usePlaylistsList` honors `timeFrame`.

### Key Hooks

- `useUserAuth()` — Auth state, sign in/up/out, guest detection (`src/features/user-auth/context/UserAuthContext.tsx`)
- `useSpotifySearch(options?)` — Debounced Spotify search with abort control (`src/features/search-results/hooks/useSpotifySearch.ts`)
- `usePersistInteractions(item, profileId, onStatsChanged?)` — Per-item ratings, likes, listened, want-to-listen, reviews persisted to Supabase via `profileApi`, with optimistic updates + diary side-effects; no-op for guests (`src/features/detail/hooks/usePersistInteractions.ts`)
- `useUserAuthForm(isCreateAccount)` — Auth form state via react-hook-form (`src/features/user-auth/hooks/useUserAuthForm.ts`)
- `useItemList({ kind, filters, fallback })` — Shared browse/search hook for tracks + albums (`src/features/items/hooks/useItemList.ts`)

### Routing

Defined in `src/app/App.tsx` using React Router 7. Current routes:

- `/`, `/signup`, `/signin`
- `/search`
- `/track/:id`, `/album/:id`, `/artist/:id`
- `/profile/:username`, `/profile/:username/ratings`
- `/members`, `/members/search`
- `/tracks`, `/tracks/search` — `<ItemBrowsePage kind="track" />`, `<ItemSearchPage kind="track" />`
- `/albums`, `/albums/search` — `<ItemBrowsePage kind="album" />`, `<ItemSearchPage kind="album" />`
- `/playlists`, `/playlists/search`

Planned: `/diary` (diary rows already written + shown on profile; no standalone page), `/playlist/:id`, `/discover`.

---

## Backend (Supabase)

### Design Principles

1. **Frontend reads from Supabase tables**, not Spotify API directly — minimizes API calls
2. **Every Spotify API call funnels data into Supabase tables** — the Edge Function populates albums, artists, songs tables
3. **Supabase Auth** handles all user identity — profiles table links to `auth.users`

### Edge Functions

All live in the Supabase dashboard, are manually deployed, and run with `verify_jwt: false` — each validates the caller's Supabase JWT **in-code** via `auth.getUser()` (the anon key alone is not treated as identity). Frontend client is `src/services/spotify/service.ts`; responses are runtime-validated with zod (`schemas.ts`) so shape drift surfaces as a clear error.

- **`/spotify-search`** — search query in (POST), calls Spotify server-side, caches in `spotify_search_cache`, populates `albums`/`artists`/`songs`, returns `SpotifySearchResponse` with `cached: boolean`. Has per-user rate limiting (40/min).
- **`/spotify-lookup`** — fetch a single track/album/artist by id → `ItemDetail` (used by detail pages)
- **`/spotify-discography`** — artist's albums + singles → `DiscographyResult`
- **`/spotify-album-tracks`** — an album's track list → `AlbumTrackItem[]`

### Table Schemas

**`profiles`** — Links to `auth.users` via FK on `id`

```sql
create table public.profiles (
  id uuid not null,
  username character varying not null,
  bio character varying null,
  avatar_url character varying null,
  created_at timestamp with time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_username_key unique (username),
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade
);
```

**`albums`** — Cached from Spotify, keyed by `spotify_id`

```sql
create table public.albums (
  id uuid not null default gen_random_uuid(),
  spotify_id text not null,
  name text not null,
  album_type text null,
  total_tracks integer null,
  image_url text null,
  release_date text null,
  external_url text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  artists jsonb null,
  constraint albums_pkey primary key (id),
  constraint albums_spotify_id_key unique (spotify_id)
);
```

### Other Tables

| Table                    | Purpose                                                                    |
| ------------------------ | -------------------------------------------------------------------------- |
| `artists`                | Cached artist data from Spotify                                            |
| `songs`                  | Cached track data from Spotify                                             |
| `ratings`                | User ratings for songs/albums (1–10 scale, supports half-stars)            |
| `reviews`                | User review bodies + rating, per item                                      |
| `item_interactions`      | `liked` / `listened` / `want_to_listen` booleans per item per user         |
| `diary`                  | Activity log rows (`rated`/`liked`/`listened`/`want_to_listen`/`reviewed`) |
| `top5`                   | User's top 5 lists (links to `profiles`)                                   |
| `follows`                | Follower graph, composite PK `(follower_id, following_id)`                 |
| `playlists`              | User playlists (owner, visibility)                                         |
| `playlist_items`         | Items within a playlist                                                    |
| `tags` / `playlist_tags` | Hashtag/tagging system for playlists                                       |
| `spotify_search_cache`   | Raw Spotify search result cache for Edge Function dedup                    |

> Note: most tables/policies were created via the dashboard rather than tracked migrations, so only a handful of migrations are recorded. `ratings`/`reviews`/`diary` use a 1–10 check constraint. All 16 public tables have RLS enabled; `anon` access is intentional (guest sessions).

### Data Flow

```
User searches → useSpotifySearch (debounce 350ms)
  → POST to Supabase Edge Function /spotify-search
    → Edge Function calls Spotify API, caches results, populates tables
    → Returns results to frontend
  → User clicks item → detail page (data passed via router state, cached in sessionStorage)
```

---

## Data Persistence (Current)

Interactions are **persisted to Supabase** (`ratings`, `reviews`, `item_interactions`, `diary`) for logged-in users via `usePersistInteractions` → `profileApi`. The localStorage migration is **done** — no `localStorage` usage remains in the app.

| Storage        | Key                | Data                                             |
| -------------- | ------------------ | ------------------------------------------------ |
| sessionStorage | `pressd_item_{id}` | Detail page item data cache (track/album/artist) |

Guests (anonymous sessions with no profile row) keep interactions in component state only — nothing is persisted, so no data leaks across sessions on a shared browser.

---

## Styling

- **Chakra UI 3** with custom `pressdSystem` theme (`src/app/theme.ts`)
- **Dark theme** by default (Letterboxd-inspired). CSS variables defined in theme: `--pressd-bg`, `--pressd-surface`, `--pressd-accent`, `--pressd-red`, `--pressd-green`, etc.
- **Fonts**: DM Sans (`--pressd-sans`) for body/headings, DM Mono (`--pressd-mono`) for labels/badges
- **Utility classes**: `.pressd-mono` (uppercase monospace), `.pressd-link` (hover underline)

---

## Commands

```bash
npm run dev          # Start dev server (Vite, http://localhost:5173)
npm run build        # Type-check (tsc -b) then production build
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run test         # Run tests once (Vitest)
npm run test:watch   # Tests in watch mode
```

Single test file: `npx vitest run src/features/user-auth/hooks/useUserAuthForm.test.tsx`

## Environment

Requires `.env.local`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_FN_URL=...           # Supabase Edge Function base URL for Spotify proxy
VITE_HCAPTCHA_SITE_KEY=...         # Optional: hCaptcha for bot protection
```

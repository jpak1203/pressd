import { supabase } from "@/lib/supabase/client";
import type {
  SpotifySearchParams,
  SpotifySearchResponse,
} from "@/services/spotify/types";
import type { DiscographyResult } from "@/features/detail/types/detail";

const supabaseFnUrl = import.meta.env.VITE_SUPABASE_FN_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let guestSignInPromise: Promise<string> | null = null;

const getAccessToken = async (): Promise<string> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) return session.access_token;

  if (!guestSignInPromise) {
    guestSignInPromise = (async () => {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error || !data.session?.access_token) {
        throw new Error(
          error?.message ??
            "Unable to create guest session. Enable anonymous auth in Supabase.",
        );
      }

      return data.session.access_token;
    })().finally(() => {
      guestSignInPromise = null;
    });
  }

  return guestSignInPromise;
};

export const searchSpotify = async (
  params: SpotifySearchParams,
  signal?: AbortSignal,
): Promise<SpotifySearchResponse> => {
  if (!supabaseFnUrl || !supabasePublishableKey)
    throw new Error("Missing env vars");

  const accessToken = await getAccessToken();
  const payload = {
    q: params.q,
    type: params.type ?? "track,artist,album",
    limit: params.limit ?? 10,
    market: params.market ?? "US",
  };

  const res = await fetch(`${supabaseFnUrl}/spotify-search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      apikey: supabasePublishableKey,
    },
    body: JSON.stringify(payload),
    signal,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(`Spotify search failed (${res.status}): ${message}`);
  }

  return res.json() as Promise<SpotifySearchResponse>;
};

export const fetchDiscographyFromEdge = async (
  artistId: string,
  signal?: AbortSignal,
): Promise<DiscographyResult> => {
  if (!supabaseFnUrl || !supabasePublishableKey)
    throw new Error("Missing env vars");

  const accessToken = await getAccessToken();
  const res = await fetch(`${supabaseFnUrl}/spotify-discography`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      apikey: supabasePublishableKey,
    },
    body: JSON.stringify({ id: artistId }),
    signal,
  });

  if (!res.ok) throw new Error(`Discography fetch failed (${res.status})`);
  return res.json() as Promise<DiscographyResult>;
};

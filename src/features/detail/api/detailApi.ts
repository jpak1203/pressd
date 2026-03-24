import { supabase } from "@/lib/supabase/client";
import type {
  AlbumDetail,
  DiscographyResult,
} from "@/features/detail/types/detail";

const DISCOGRAPHY_TTL_MS = 1;

export const fetchArtistDiscography = async (
  artistId: string,
  fetchFresh: (id: string) => Promise<DiscographyResult>,
): Promise<DiscographyResult> => {
  const filter = JSON.stringify([{ id: artistId }]);

  const { data } = await supabase
    .from("albums")
    .select(
      "spotify_id, name, image_url, release_date, album_type, total_tracks, external_url, artists, updated_at",
    )
    .filter("artists", "cs", filter)
    .order("release_date", { ascending: false });

  const cachedAlbums = data ?? [];
  const mostRecentUpdate = cachedAlbums.reduce<Date | null>((max, r) => {
    const d = new Date(r.updated_at as string);
    return max === null || d > max ? d : max;
  }, null);
  const isStale =
    mostRecentUpdate === null ||
    Date.now() - mostRecentUpdate.getTime() > DISCOGRAPHY_TTL_MS;

  if (isStale) {
    return fetchFresh(artistId);
  }

  const mapRow = (r: (typeof cachedAlbums)[number]): AlbumDetail => ({
    type: "album" as const,
    id: r.spotify_id as string,
    name: r.name as string,
    image: (r.image_url as string | null) ?? null,
    artists: (r.artists as Array<{ id: string; name: string }>) ?? [],
    release_date: (r.release_date as string) ?? "",
    album_type: r.album_type as string,
    total_tracks: r.total_tracks as number,
    external_url: (r.external_url as string | undefined) ?? undefined,
  });

  const validRows = cachedAlbums.filter(
    (r) => r.album_type !== null && r.total_tracks !== null,
  );

  return {
    albums: validRows.filter((r) => r.album_type === "album").map(mapRow),
    singles: validRows.filter((r) => r.album_type === "single").map(mapRow),
  };
};

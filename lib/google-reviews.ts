export type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
};

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return [];

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}&fields=reviews,rating,user_ratings_total&reviews_sort=newest&key=${key}`;

    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return [];

    const data = await res.json();
    if (data.status !== "OK") return [];

    return (data.result?.reviews ?? []) as GoogleReview[];
  } catch {
    return [];
  }
}

export async function getGoogleRating(): Promise<{ rating: number; total: number } | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}&fields=rating,user_ratings_total&key=${key}`;

    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== "OK") return null;

    return {
      rating: data.result?.rating ?? 0,
      total: data.result?.user_ratings_total ?? 0,
    };
  } catch {
    return null;
  }
}

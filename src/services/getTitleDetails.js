export async function getTitleDetails(type, id) {
  // Fetch title details
  const titleDetailsRes = await fetch(`https://api.jikan.moe/v4/${type}/${id}`);
  const titleDetailsData = await titleDetailsRes.json();

  // Extract common fields
  const commonFields = {
    id: titleDetailsData.data.mal_id,
    url: titleDetailsData.data.url,
    webpImage: titleDetailsData.data.images.webp.image_url,
    title: titleDetailsData.data.title,
    titleJapanese: titleDetailsData.data.title_japanese,
    type: titleDetailsData.data.type,
    status: titleDetailsData.data.status,
    score: titleDetailsData.data.score,
    favorites: titleDetailsData.data.favorites,
    synopsis: titleDetailsData.data.synopsis,

    genres: titleDetailsData.data.genres.map((genre) => ({
      id: genre.mal_id,
      name: genre.name,
      url: genre.url,
    })),

    themes: titleDetailsData.data.themes.map((theme) => ({
      id: theme.mal_id,
      type: theme.type,
      name: theme.name,
      url: theme.url,
    })),
  };

  //   Extract additional fields based on type
  const additionalFields =
    type === "anime"
      ? {
          episodes: titleDetailsData.data.episodes,
          airing: titleDetailsData.data.airing,
          duration: titleDetailsData.data.duration,
          rating: titleDetailsData.data.rating,
        }
      : {
          chapters: titleDetailsData.data.chapters,
          volumes: titleDetailsData.data.volumes,
          publishing: titleDetailsData.data.publishing,
        };

  return { ...commonFields, ...additionalFields };
}

export async function getSearchResults(query) {
  // Fetch anime results
  const animeRes = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
  const animeData = await animeRes.json();

  // Fetch manga results
  const mangaRes = await fetch(`https://api.jikan.moe/v4/manga?q=${query}`);
  const mangaData = await mangaRes.json();

  // Map anime results
  const animeResults = animeData.data.map((anime) => ({
    url: anime.url,
    type: anime.type,
    score: anime.score,
    status: anime.status,
    isAiring: anime.airing,
    webp: anime.images.webp.image_url,
    id: anime.mal_id,
    episodes: anime.episodes,
    duration: anime.duration,
    scoredBy: anime.scored_by,
    synopsis: anime.synopsis,
    defaultTitle: anime.title,
    japaneseTitle: anime.title_japanese,
    englishTitle: anime.title_english,
    mediaType: "Anime",
  }));

  // Map manga results
  const mangaResults = mangaData.data.map((manga) => ({
    url: manga.url,
    type: manga.type,
    score: manga.score,
    status: manga.status,
    isPublishing: manga.publishing,
    webp: manga.images.webp.image_url,
    id: manga.mal_id,
    chapters: manga.chapters,
    volumes: manga.volumes,
    synopsis: manga.synopsis,
    defaultTitle: manga.title,
    japaneseTitle: manga.title_japanese,
    englishTitle: manga.title_english,
    mediaType: "Manga",
  }));

  // Combine and return both anime and manga results
  return [...animeResults, ...mangaResults];
}

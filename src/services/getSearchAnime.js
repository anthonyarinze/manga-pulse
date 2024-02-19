export async function getSearchAnime(query) {
  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);

  const data = await res.json();

  const animeData = data.data.map((anime) => {
    return {
      url: anime.url,
      type: anime.type,
      score: anime.score,
      status: anime.status,
      airing: anime.airing,
      webp: anime.images.webp.image_url,
      mal_id: anime.mal_id,
      episodes: anime.episodes,
      duration: anime.duration,
      scoredBy: anime.scored_by,
      synopsis: anime.synopsis,
      defaultTitle: anime.title,
      japaneseTitle: anime.title_japanese || "N/A",
      englishTitle: anime.title_english,
    };
  });

  return animeData;
}

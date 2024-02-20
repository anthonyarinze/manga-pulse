export async function getRecommendedAnime() {
  const res = await fetch("https://api.jikan.moe/v4/recommendations/anime");

  const data = await res.json();

  const animeData = data.data.map((anime) => {
    const entryData = anime.entry.map((entry) => {
      return {
        mal_id: entry.mal_id,
        url: entry.url,
        webp: entry.images.webp.image_url,
        title: entry.title,
      };
    });

    return {
      entries: entryData,
      content: anime.content,
    };
  });

  return animeData;
}

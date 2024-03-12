export async function getRecommendedAnimeById(id) {
  const res = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/recommendations`
  );

  const data = await res.json();

  const animeData = data.data.map((anime) => {
    return {
      id: anime.entry.mal_id,
      url: anime.entry.url,
      image_url: anime.entry.images.webp.image_url,
      title: anime.entry.title,
    };
  });

  return animeData;
}

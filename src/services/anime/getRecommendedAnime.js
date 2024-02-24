export async function getRecommendedAnime() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime");

  const data = await res.json();

  const animeData = data.data.map((anime) => {
    return {
      id: anime.mal_id,
      url: anime.url,
      webp: anime.images.webp.image_url,
      title: anime.title,
      type: anime.type,
      episodes: anime.episodes,
      status: anime.status,
      duration: anime.duration,
      rating: anime.rating,
      score: anime.score,
      favorites: anime.favorites,
      synopsis: anime.synopsis,
    };
  });

  return animeData;
}

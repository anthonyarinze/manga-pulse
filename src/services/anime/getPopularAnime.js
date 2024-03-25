export async function getPopular() {
  const res = await fetch("https://api.jikan.moe/v4/watch/promos/popular");
  const data = await res.json();

  const animeData = data.data.map((anime) => {
    return {
      url: anime.entry.url,
      webp: anime.entry.images.webp.image_url,
      title: anime.entry.title,
      mal_id: anime.entry.mal_id,
    };
  });
  return animeData;
}

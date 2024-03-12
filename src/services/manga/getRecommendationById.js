export async function getRecommendedMangaById(id) {
  const res = await fetch(
    `https://api.jikan.moe/v4/manga/${id}/recommendations`
  );

  const data = await res.json();

  const mangaData = data.data.map((manga) => {
    return {
      id: manga.entry.mal_id,
      url: manga.entry.url,
      image_url: manga.entry.images.webp.image_url,
      title: manga.entry.title,
    };
  });

  return mangaData;
}

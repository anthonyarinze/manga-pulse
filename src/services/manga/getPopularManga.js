export async function getPopularManga() {
  const res = await fetch("https://api.jikan.moe/v4/top/manga");
  const data = await res.json();

  const mangaData = data.data.map((manga) => {
    return {
      id: manga.mal_id,
      url: manga.url,
      webp: manga.images.webp.image_url,
      title: manga.title,
      status: manga.status,
      isPublishing: manga.publishing,
      score: manga.score,
      scored_by: manga.scored_by,
      synopsis: manga.synopsis,
      type: manga.type,
      chapters: manga.chapters,
      volumes: manga.volumes,
    };
  });

  return mangaData;
}

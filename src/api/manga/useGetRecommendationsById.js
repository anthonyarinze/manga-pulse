import { useQuery } from "react-query";
import { getRecommendedMangaById } from "../../services/manga/getRecommendationById";

const useRecommendedManga = (id) => {
  return useQuery(["recommendedManga", id], () => getRecommendedMangaById(id));
};

export default useRecommendedManga;

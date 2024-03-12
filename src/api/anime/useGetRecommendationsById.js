import { useQuery } from "react-query";
import { getRecommendedAnimeById } from "../../services/anime/getRecommendationById";

const useRecommendedAnime = (id) => {
  return useQuery(["recommendedAnime", id], () => getRecommendedAnimeById(id));
};

export default useRecommendedAnime;

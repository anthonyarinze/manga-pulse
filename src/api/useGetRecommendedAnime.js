import { useQuery } from "react-query";
import { getRecommendedAnime } from "../services/anime/getRecommendedAnime";

export function useGetRecommendedAnime() {
  return useQuery("recommendedAnime", getRecommendedAnime);
}

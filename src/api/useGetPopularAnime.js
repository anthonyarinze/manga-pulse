import { useQuery } from "react-query";
import { getPopular } from "../services/anime/getPopularAnime";

export function useGetPopularAnime() {
  return useQuery("popularAnime", getPopular);
}

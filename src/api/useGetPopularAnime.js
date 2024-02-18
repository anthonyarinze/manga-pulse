import { useQuery } from "react-query";
import { getPopular } from "../services/getPopularAnime";

export function useGetPopularAnime() {
  return useQuery("popularAnime", getPopular);
}

import { useQuery } from "react-query";
import { getSearchAnime } from "../services/anime/getSearchAnime";

export function useGetAnime(query) {
  return useQuery(["anime", query], () => getSearchAnime(query));
}

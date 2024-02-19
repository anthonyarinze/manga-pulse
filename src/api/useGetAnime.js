import { useQuery } from "react-query";
import { getSearchAnime } from "../services/getSearchAnime";

export function useGetAnime(query) {
  return useQuery(["anime", query], () => getSearchAnime(query));
}

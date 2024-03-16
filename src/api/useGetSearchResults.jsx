import { useQuery } from "react-query";
import { getSearchResults } from "../services/getSearchResults";

export function useGetSearchResults(query) {
  return useQuery(["search", query], () => getSearchResults(query));
}

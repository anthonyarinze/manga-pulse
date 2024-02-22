import { useQuery } from "react-query";
import { getPopularManga } from "../../services/manga/getPopularManga";

export function useGetPopularManga() {
  return useQuery("popularManga", getPopularManga);
}

import { useQuery } from "react-query";
import { getLibrary } from "../services/getLibrary";

export function useGetLibrary() {
  const {
    isLoading,
    data: titles,
    error,
  } = useQuery({
    queryKey: ["library"],
    queryFn: getLibrary,
    staleTime: 1000 * 60 * 5, //Caches library titles for 5 minutes
    refetchOnWindowFocus: false, //Avoid refetching when switching tabs
  });

  return { isLoading, titles, error };
}

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
  });

  return { isLoading, titles, error };
}

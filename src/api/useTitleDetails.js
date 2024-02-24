import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getTitleDetails } from "../services/getTitleDetails";

export function useTitleDetails() {
  const { titleId, type } = useParams();
  const endpoint = type === "anime" ? "anime" : "manga";
  const {
    isLoading,
    data: title,
    error,
  } = useQuery({
    queryKey: [type, titleId],
    queryFn: () => getTitleDetails(endpoint, titleId),
    retry: false,
  });

  return { isLoading, error, title };
}

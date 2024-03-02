import { useMutation } from "react-query";
import { updateLibrary } from "../services/updateLibrary";

export function useUpdateLibrary() {
  const { mutate: update, isLoading } = useMutation({
    mutationFn: (titleDetails, status) => updateLibrary(titleDetails, status),
  });
  return { update, isLoading };
}

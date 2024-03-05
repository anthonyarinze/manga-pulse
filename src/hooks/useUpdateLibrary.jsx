import { useMutation } from "react-query";
import { updateLibrary } from "../services/updateLibrary";

export function useUpdateLibrary() {
  const { mutate: update, isLoading } = useMutation({
    mutationFn: updateLibrary,
  });
  return { update, isLoading };
}

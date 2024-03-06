import { useMutation, useQueryClient } from "react-query";
import { updateLibrary } from "../services/updateLibrary";
import { useDispatch } from "react-redux";
import { closeModal } from "../slices/modalSlice";

export function useUpdateLibrary() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate: update, isLoading } = useMutation({
    mutationFn: updateLibrary,
    onSuccess: () => queryClient.invalidateQueries("library"),
    onSettled: () => dispatch(closeModal()),
  });
  return { update, isLoading };
}

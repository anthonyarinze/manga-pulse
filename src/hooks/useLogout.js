import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth/logoutUser";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/auth", { replace: true });
      queryClient.removeQueries();
    },
  });

  return { logout, isLoading };
}

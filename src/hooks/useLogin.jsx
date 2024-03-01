import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth/loginUser";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user.user);
    },
    onError: () => {
      toast.error("Provided email/password is incorrect.");
    },
  });

  return { login, isLoading };
}

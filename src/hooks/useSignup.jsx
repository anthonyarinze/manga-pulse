import { useMutation } from "react-query";
import { signUpUser } from "../services/auth/signUpUser";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success("Account successfully created!");
    },
  });

  return { signUp, isLoading };
}

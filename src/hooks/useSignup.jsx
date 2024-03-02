import { useMutation } from "react-query";
import { signUpUser } from "../services/auth/signUpUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpUser,
    onSuccess: async (user) => {
      // Extract user details
      const userId = user.user.id;
      const userName = user.user.user_metadata.fullName;
      const userEmail = user.user.email;

      // Insert user into Supabase 'users' table
      const { data, error } = await supabase
        .from("users")
        .insert([{ id: userId, name: userName, email: userEmail }])
        .select();

      if (error) {
        console.error("Error inserting user into Supabase:", error.message);
        // Handle the error as needed
      } else {
        console.log("User successfully inserted into Supabase:", data);
      }

      // Continue with your existing onSuccess logic
      toast.success(
        "Account successfully created! Please verify the account from your email address."
      );
      navigate("/dashboard");
    },
  });

  return { signUp, isLoading };
}

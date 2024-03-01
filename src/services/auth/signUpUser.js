import supabase from "../../utils/supabase";

export async function signUpUser({ name, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

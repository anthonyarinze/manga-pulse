import store from "../../slices/store";
import { setUser } from "../../slices/userSlice";
import supabase from "../../utils/supabase";

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  store.dispatch(setUser(data.user));

  return data.user;
}

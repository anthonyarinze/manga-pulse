import supabase from "../utils/supabase";

export async function getLibrary() {
  const { data: titles, error } = await supabase.from("library").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Titles could not be loaded at this time.");
  } else {
    return titles;
  }
}

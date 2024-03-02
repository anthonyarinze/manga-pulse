import toast from "react-hot-toast";
import supabase from "../utils/supabase";

export const updateLibrary = async (titleDetails) => {
  try {
    const { error } = await supabase.from("library").upsert([
      {
        id: titleDetails.id,
        title_name: titleDetails.name,
        rating: titleDetails.rating,
        webp: titleDetails.webpImage,
        episodes: titleDetails.episodes,
        media_type: titleDetails.mediaType,
        status: titleDetails.status,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    toast.success("Library successfully updated.");
  } catch (error) {
    toast.error(`Error updating library: ${error.message}`);
  }
};

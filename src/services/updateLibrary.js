import toast from "react-hot-toast";
import supabase from "../utils/supabase";

export const updateLibrary = async (titleDetails) => {
  try {
    // Check if the status is "None" and perform removal logic
    if (titleDetails.status === "None") {
      // Delete the title from the library
      const { error } = await supabase
        .from("library")
        .delete()
        .eq("id", titleDetails.id);

      if (error) {
        throw new Error(error.message);
      }
      toast.success("Title successfully removed from library.");
    } else {
      // Perform update logic for other status values
      const { error } = await supabase.from("library").upsert([
        {
          id: titleDetails.id,
          title_name: titleDetails.title,
          rating: titleDetails.rating,
          webp: titleDetails.webpImage,
          episodes: titleDetails.episodes,
          media_type: titleDetails.type,
          status: titleDetails.status,
          synopsis: titleDetails.synopsis,
          score: titleDetails.score,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Library successfully updated.");
    }
  } catch (error) {
    toast.error(`Error updating library: ${error.message}`);
  }
};

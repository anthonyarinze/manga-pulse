import { useSelector } from "react-redux";

const useIsInLibrary = (title) => {
  // Access the library state from Redux using useSelector
  const libraryTitles = useSelector((state) => state.library);

  // Check if title is present in the library
  return (
    title && libraryTitles.some((libraryTitle) => libraryTitle.id === title.id)
  );
};

export default useIsInLibrary;

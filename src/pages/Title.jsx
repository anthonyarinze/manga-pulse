import styled from "styled-components";
import { useTitleDetails } from "../api/useTitleDetails";
import Spinner from "../ui/Spinner";
import { useParams } from "react-router-dom";
import {
  capitalizeFirstLetter,
  handleClickTitle,
  openInMangadex,
} from "../utils/helpers";
import { useEffect } from "react";
import Modal from "../ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { currentTitle } from "../slices/titleSlice";
import { setTitles } from "../slices/librarySlice";
import { addToHistory } from "../slices/historySlice";
import { useGetLibrary } from "../api/useGetLibrary";
import TitleInfo from "../ui/title/TitleInfo";
import Stats from "../ui/title/Stats";
import Mangadex from "../ui/title/Mangadex";
import Synopsis from "../ui/title/Synopsis";
import TitleButtons from "../ui/title/TitleButtons";
import Genres from "../ui/title/Genres";
import Themes from "../ui/title/Themes";
import useIsInLibrary from "../hooks/title/useIsInLibrary";
import RecommendationsById from "../ui/components/RecommendationsById";
import MangaRecommendationsById from "../ui/components/MangaRecommendationsById";

const StyledSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 16px;
  align-items: start;
  flex-direction: column;
  justify-content: start;
`;

const StyledImage = styled.img`
  height: 260px;
  border-radius: 8px;
  width: fit-content;
  object-fit: contain;
`;

const StyledImageAndDataRow = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  align-items: start;
  margin-bottom: 2rem;
  justify-content: start;
`;

const StyledData = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = () => {
  const dispatch = useDispatch();
  const { titleId, type } = useParams();
  const { isLoading, error, title } = useTitleDetails(type, titleId);
  const isModalOpen = useSelector((state) => state.modal);
  const isInLibrary = useIsInLibrary(title);

  const { isLoading: isGettingLibraryTitles, titles: libraryTitles } =
    useGetLibrary();

  useEffect(() => {
    if (!isGettingLibraryTitles && libraryTitles) {
      dispatch(setTitles(libraryTitles));
      dispatch(currentTitle({ ...title, isInLibrary }));
    }
    // to add the recently viewed title to history state
    if (title) dispatch(addToHistory(title));
  }, [dispatch, isGettingLibraryTitles, libraryTitles, isInLibrary, title]);

  if (isLoading || isGettingLibraryTitles) return <Spinner />;
  if (error) return <p>An error occurred: {error.message}.</p>;

  const {
    url,
    webpImage,
    title: titleName,
    titleJapanese,
    status,
    score,
    favorites,
    synopsis,
    genres,
    themes,

    // Conditionally include additionalFields based on type
    ...additionalFields
  } = title;

  const { episodes, rating, chapters } =
    type === "anime" ? additionalFields : additionalFields;

  document.title = `Manga Pulse | ${capitalizeFirstLetter(
    type
  )} - ${titleName}`;

  return (
    <StyledSection>
      <StyledImageAndDataRow>
        <StyledImage src={webpImage} alt="img" />
        <StyledData>
          {/* div to enforce space bwtween text and buttons */}
          <div>
            <TitleInfo
              titleName={titleName}
              titleJapanese={titleJapanese}
              handleTitleClick={() => handleClickTitle(url)}
            />
            {/* Stats */}
            <Stats
              episodes={episodes}
              status={status}
              score={score}
              favorites={favorites}
              rating={rating}
              chapters={chapters}
            />
          </div>
          {/* bookmark & share */}
          <TitleButtons isInLibrary={isInLibrary} />
        </StyledData>
      </StyledImageAndDataRow>

      {/* conditionally render mangadex button only if current title is manga */}
      {type === "manga" && (
        <Mangadex openInMangadex={() => openInMangadex(titleName)} />
      )}

      <Genres genres={genres} />

      <Themes themes={themes} />

      <Synopsis synopsis={synopsis} />

      {type !== "manga" && <RecommendationsById id={titleId} />}

      {type === "manga" && <MangaRecommendationsById id={titleId} />}

      {/* Conditionally render the modal based on the state */}
      {isModalOpen && <Modal />}
    </StyledSection>
  );
};

export default Title;

import styled from "styled-components";
import { useTitleDetails } from "../api/useTitleDetails";
import Spinner from "../ui/Spinner";
import { useParams } from "react-router-dom";
import Heading from "../ui/Heading";
import {
  FaBookmark,
  FaExternalLinkAlt,
  FaReadme,
  FaStar,
} from "react-icons/fa";
import { capitalizeFirstLetter, formatFavorites } from "../utils/helpers";
import { IoBookmarksOutline, IoShareOutline, IoTvSharp } from "react-icons/io5";
import { MdBookmarkAdded } from "react-icons/md";
import TitleButton from "../ui/TitleButton";
import { useEffect } from "react";
import Modal from "../ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { currentTitle } from "../slices/titleSlice";
import { setTitles } from "../slices/librarySlice";
import { openModal } from "../slices/modalSlice";
import { addToHistory } from "../slices/historySlice";
import RecommendationsById from "../components/RecommendationsById";
import MangaRecommendationsById from "../components/MangaRecommendationsById";
import { useGetLibrary } from "../api/useGetLibrary";

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

const StyledSynopsis = styled.p`
  margin-top: 15px;
`;

const StyledImageAndDataRow = styled.div`
  width: 100%;
  height: 260px;
  display: flex;
  align-items: start;
  justify-content: start;
`;

const StyledData = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  margin-left: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledButtons = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  height: fit-content;
`;

const Title = () => {
  const dispatch = useDispatch();
  const { titleId, type } = useParams();
  const { isLoading, error, title } = useTitleDetails(type, titleId);
  const isModalOpen = useSelector((state) => state.modal);
  const titleDetails = useSelector((state) => state.title);

  useEffect(() => {
    if (title) {
      dispatch(addToHistory(title));
    }
  }, [dispatch, title]);

  const { isLoading: isGettingLibraryTitles, titles: libraryTitles } =
    useGetLibrary();

  useEffect(() => {
    if (!isGettingLibraryTitles && libraryTitles) {
      dispatch(setTitles(libraryTitles));
    }
  }, [dispatch, isGettingLibraryTitles, libraryTitles, isLoading]);

  const library = useSelector((state) => state.library);
  const isInLibrary = title
    ? library.some((libraryTitle) => libraryTitle.id === title.id)
    : false;

  // to sync the current title state if the title is added to library from the modal
  useEffect(() => {
    dispatch(currentTitle({ ...title, isInLibrary }));
  }, [dispatch, library, title, isInLibrary]);

  if (isLoading || isGettingLibraryTitles) return <Spinner />;
  if (error) return <p>An error occurred. Please try again later.</p>;

  const {
    url,
    webpImage,
    title: titleName,
    titleJapanese,
    status,
    score,
    favorites,
    synopsis,

    // Conditionally include additionalFields based on type
    ...additionalFields
  } = title;

  const { episodes, rating, chapters, volumes } =
    type === "anime" ? additionalFields : additionalFields;

  document.title = `Manga Pulse | ${capitalizeFirstLetter(
    type
  )} - ${titleName}`;

  const handleShareButtonClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "Check out this awesome title.",
          url: window.location.href,
        });
      } else {
        throw new Error("Web Share API not supported in this browser");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  const handleClickTitle = (url) => {
    window.open(url);
  };

  return (
    <StyledSection>
      <StyledImageAndDataRow>
        <StyledImage src={webpImage} alt="img" />
        <StyledData>
          {/* div to enforce space bwtween text and buttons */}
          <div>
            <Heading as="h2">
              {titleName}
              <FaExternalLinkAlt
                style={{
                  marginLeft: "6px",
                  fontSize: "1.7rem",
                  cursor: "pointer",
                }}
                onClick={() => handleClickTitle(url)}
              />
            </Heading>
            <p>{titleJapanese}</p>
            {/* Stats */}
            <span>
              <Heading as="h5">
                <FaStar style={{ color: "gold" }} /> {score} <FaBookmark />{" "}
                {formatFavorites(favorites)}
              </Heading>
            </span>
            <Heading as="h5">
              {episodes && <IoTvSharp />}
              {episodes && `${episodes} ● ${status}, ${rating}`}
              {chapters && <FaReadme />}
              {chapters && `${chapters} | Status: ${status}`}
            </Heading>
          </div>
          {/* bookmark & share */}
          <StyledButtons>
            <TitleButton as="edit" onClick={() => dispatch(openModal())}>
              {titleDetails.isInLibrary ? (
                <MdBookmarkAdded />
              ) : (
                <IoBookmarksOutline />
              )}
            </TitleButton>

            <TitleButton as="share" onClick={handleShareButtonClick}>
              <IoShareOutline />
            </TitleButton>
          </StyledButtons>
        </StyledData>
      </StyledImageAndDataRow>
      <StyledSynopsis>{synopsis}</StyledSynopsis>

      {type !== "manga" && <RecommendationsById id={titleId} />}

      {type === "manga" && <MangaRecommendationsById id={titleId} />}

      {/* Conditionally render the modal based on the state */}
      {isModalOpen && <Modal />}
    </StyledSection>
  );
};

export default Title;

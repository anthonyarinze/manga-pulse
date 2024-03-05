import styled from "styled-components";
import { useTitleDetails } from "../api/useTitleDetails";
import Spinner from "../ui/Spinner";
import { useParams } from "react-router-dom";
import Heading from "../ui/Heading";
import { FaBookmark, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import StyledCardLink from "../components/StyledCardLink";
import { formatFavorites } from "../utils/helpers";
import { IoBookmarksOutline, IoShareOutline } from "react-icons/io5";
import { MdBookmarkAdded } from "react-icons/md";
import TitleButton from "../ui/TitleButton";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { currentTitle } from "../slices/titleSlice";
import { useGetLibrary } from "../hooks/useGetLibrary";
import { setTitles } from "../slices/librarySlice";

const StyledSection = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 16px;
  align-items: start;
  flex-direction: column;
  justify-content: start;
`;

const StyledBasicData = styled.div`
  width: 60%;
  height: 280px;
  display: flex;
  justify-content: start;
`;

const StyledTitleBio = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 2rem;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledImage = styled.img`
  height: 100%;
  border-radius: 8px;
  width: fit-content;
  object-fit: contain;
`;

const StyledTitleName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledStats = styled.div`
  gap: 10px;
  display: flex;
  font-size: 1.9rem;
  align-items: center;
  justify-content: start;
`;

const StyledTopBasicData = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: column;
`;
const StyledBottomBasicData = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const StyledSynopsis = styled.div`
  width: 80%;
  margin-top: 30px;
  line-height: 1.4;
  font-size: 1.5rem;
  margin-right: 20px;
  padding-bottom: 10px;
`;

const Title = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { titleId, type } = useParams();
  const { isLoading, error, title } = useTitleDetails(type, titleId);

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

  useEffect(() => {
    dispatch(currentTitle({ ...title, isInLibrary }));
  }, [dispatch, libraryTitles, title, library, isInLibrary]);

  if (isLoading || isGettingLibraryTitles) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

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

  const handleEditButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleShareButtonClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          text: "Check out this awesome title!",
          url: window.location.href,
        });
      } else {
        throw new Error("Web Share API not supported in this browser");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
      // Handle errors or provide a fallback
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  document.title = `Manga Tracker | ${capitalizeFirstLetter(
    type
  )} - ${titleName}`;

  return (
    <StyledSection>
      <StyledBasicData>
        {/* IMAGE */}
        <StyledImage src={webpImage} alt="img" />
        <StyledTitleBio>
          {/* TOP PART (RATING, TITLE, FAVORITES) */}
          <StyledTopBasicData>
            <StyledTitleName>
              <Heading as="hh5">
                {titleName}{" "}
                <StyledCardLink to={url}>
                  <FaExternalLinkAlt
                    style={{ fontSize: "2rem", marginLeft: "4px" }}
                  />
                </StyledCardLink>
              </Heading>
              <Heading as="h3">{titleJapanese}</Heading>
              <StyledStats>
                <Heading
                  as="h5"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaStar style={{ color: "gold", marginRight: "5px" }} />
                  {score}
                </Heading>
                <Heading
                  as="h5"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FaBookmark />
                  {formatFavorites(favorites)}
                </Heading>
              </StyledStats>
            </StyledTitleName>
          </StyledTopBasicData>
          {/* BOTTOM PART (ICONS) */}
          <StyledBottomBasicData>
            <TitleButton as="edit" onClick={handleEditButtonClick}>
              {isInLibrary ? <MdBookmarkAdded /> : <IoBookmarksOutline />}
            </TitleButton>
            <TitleButton as="share" onClick={handleShareButtonClick}>
              <IoShareOutline />
            </TitleButton>
          </StyledBottomBasicData>
        </StyledTitleBio>
        <Heading as="h5">
          {episodes && `${episodes} episodes ● ${status}, ${rating}`}
          {chapters &&
            `${chapters} chapters (${volumes} volumes)  ●  ${status}`}
        </Heading>
      </StyledBasicData>
      <StyledSynopsis>{synopsis}</StyledSynopsis>
      {/* Conditionally render the modal based on the state */}
      {isModalOpen && (
        <Modal handleBackdropClick={() => setIsModalOpen(false)} />
      )}
    </StyledSection>
  );
};

export default Title;

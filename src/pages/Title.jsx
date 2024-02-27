import styled from "styled-components";
import { useTitleDetails } from "../api/useTitleDetails";
import Spinner from "../ui/Spinner";
import { useParams } from "react-router-dom";
import Heading from "../ui/Heading";
import { FaBookmark, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import StyledCardLink from "../components/StyledCardLink";
import { formatFavorites } from "../utils/helpers";
import { IoBookmarksOutline, IoShareOutline } from "react-icons/io5";
import TitleButton from "../ui/TitleButton";
import { useState } from "react";

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
  align-items: center; /* Align items vertically */
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
`;

const StyledModal = styled.div`
  top: 50%;
  left: 50%;
  width: 50%;
  height: 60%;
  padding: 20px;
  z-index: 1000;
  position: fixed;
  border-radius: 10px;
  background-color: var(--color-grey-100);
  transform: translate(-50%, -50%);
`;

const StyledBackdrop = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  transition: all 0.5s;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = () => {
  const { titleId, type } = useParams();
  const { isLoading, error, title } = useTitleDetails(type, titleId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const {
    id,
    url,
    webpImage,
    title: titleName,
    titleJapanese,
    type: titleType,
    status,
    score,
    favorites,
    synopsis,

    // Conditionally include additionalFields based on type
    ...additionalFields
  } = title;

  const { episodes, airing, duration, rating, chapters, volumes, publishing } =
    type === "anime" ? additionalFields : additionalFields;

  const handleEditButtonClick = () => {
    // Toggle the state to open/close the modal
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  return (
    <StyledSection>
      <StyledBasicData>
        {/* IMAGE */}
        <StyledImage src={webpImage} alt="img" />
        <StyledTitleBio>
          {/* TOP PART (RATING, TITLE, FAVORITES) */}
          <StyledTopBasicData>
            <StyledTitleName>
              <Heading as="h1">
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
                  <FaBookmark style={{ marginRight: "5px" }} />
                  {formatFavorites(favorites)}
                </Heading>
              </StyledStats>
            </StyledTitleName>
          </StyledTopBasicData>
          {/* BOTTOM PART (ICONS) */}
          <StyledBottomBasicData>
            <TitleButton as="edit" onClick={handleEditButtonClick}>
              <IoBookmarksOutline />
            </TitleButton>
            <TitleButton as="share">
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
        <>
          <StyledBackdrop onClick={handleEditButtonClick} />
          <StyledModal>
            {/* Your modal content goes here */}
            <p>Edit modal content goes here.</p>
          </StyledModal>
        </>
      )}
    </StyledSection>
  );
};

export default Title;

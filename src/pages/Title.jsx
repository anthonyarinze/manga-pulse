import styled from "styled-components";
import { useTitleDetails } from "../api/useTitleDetails";
import Spinner from "../ui/Spinner";
import { useParams } from "react-router-dom";
import Heading from "../ui/Heading";
import { FaBookmark, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import StyledCardLink from "../components/StyledCardLink";
import { formatFavorites } from "../utils/helpers";
import { IoBookmarks } from "react-icons/io5";
import TitleButton from "../ui/TitleButton";

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
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = () => {
  const { titleId, type } = useParams();
  const { isLoading, error, title } = useTitleDetails(type, titleId);

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

  console.log(title);

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
                <Heading as="h5">
                  <FaStar style={{ color: "gold" }} /> {score}
                </Heading>
                <Heading as="h5">
                  <FaBookmark /> {formatFavorites(favorites)}
                </Heading>
              </StyledStats>
            </StyledTitleName>
          </StyledTopBasicData>
          {/* BOTTOM PART (ICONS) */}
          <StyledBottomBasicData>
            <TitleButton as="edit">
              <IoBookmarks />
            </TitleButton>
          </StyledBottomBasicData>
        </StyledTitleBio>
      </StyledBasicData>
    </StyledSection>
  );
};

export default Title;

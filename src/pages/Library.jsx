import styled from "styled-components";
import { useGetLibrary } from "../hooks/useGetLibrary";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import Heading from "../ui/Heading";
import { FaStar, FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StyledLibrary = styled.section`
  gap: 15px;
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 16px;
  flex-direction: column;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledTitle = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  min-height: 260px;
  border-radius: 4px;
  align-items: center;
  background-color: var(--color-grey-100);

  &:hover {
    background-color: #293238;
  }

  @media (min-width: 768px) {
    width: calc(50% - 7.5px); /* 50% width with 15px gap in between */
  }
`;

const StyledImage = styled.img`
  width: 40%;
  height: 100%;
  object-fit: fill;
  border-radius: 4px;
`;

const StyledData = styled.div`
  gap: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 1rem;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  gap: 4px;
  font-size: 15px;
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
`;

const StyledStatus = styled.div`
  gap: 7px;
  display: flex;
  padding: 2px 5px;
  font-weight: 600;
  font-size: smaller;
  align-items: center;
  border-radius: 2.5px;
  justify-content: center;
  background-color: var(--color-grey-300);
`;

const StyledSynopsis = styled.p`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  padding-right: 1rem;
`;

const Library = () => {
  const navigate = useNavigate();
  const { isLoading, titles } = useGetLibrary();

  if (isLoading) return <Spinner />;
  if (!titles?.length) return <Empty resource="titles" />;

  return (
    <StyledLibrary>
      <Heading as="h4">Library</Heading>
      {titles.map((title, index) => (
        <StyledTitle
          key={index}
          onClick={() =>
            navigate(`/title/${title.media_type.toLowerCase()}/${title.id}`)
          }
        >
          <StyledImage src={title.webp} alt="image" />
          <StyledData>
            <Heading as="h3">{title.title_name}</Heading>
            <StyledSpan>
              <p>{title.media_type === "Manga" ? "Manga" : "Anime"} | </p>
              <FaStar style={{ color: "gold" }} />
              <p>{title.score}</p>
            </StyledSpan>
            <StyledSpan>
              {title.episodes && `${title.episodes} episodes`}
              {title.chapters && `${title.chapters} chapters`}
              <StyledStatus>
                <FaTags /> {title.status}
              </StyledStatus>
            </StyledSpan>
            <StyledSynopsis>{title.synopsis}</StyledSynopsis>
          </StyledData>
        </StyledTitle>
      ))}
    </StyledLibrary>
  );
};

export default Library;

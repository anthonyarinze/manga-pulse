import { useSelector } from "react-redux";
import styled from "styled-components";
import Heading from "../ui/Heading";
import { FaReadme, FaStar } from "react-icons/fa";
import Empty from "../ui/Empty";
import { IoTvSharp } from "react-icons/io5";
import StyledTitleCard from "../components/StyledTitleCard";

const StyledLibrary = styled.section`
  gap: 15px;
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 1rem 2rem;
  flex-direction: column;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledImage = styled.img`
  width: 35%;
  max-height: 220px;
  object-fit: fill;
  border-radius: 4px;
`;

const StyledData = styled.div`
  gap: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  margin-left: 1rem;
  align-items: start;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledSpan = styled.span`
  gap: 4px;
  display: flex;
  font-size: 14px;
  align-items: center;
`;

const StyledStatus = styled.div`
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
  max-width: 95%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const StyledSpace = styled.div`
  height: 1rem;
`;

const StyledTitleName = styled.p`
  max-width: 95%;
  overflow: hidden;
  font-weight: 500;
  font-size: 1.7rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const History = () => {
  const historyList = useSelector((state) => state.history);

  if (!historyList?.length) return <Empty resource="history" />;

  return (
    <>
      <Heading as="h4" style={{ margin: "1rem 0rem" }}>
        History
      </Heading>
      <StyledLibrary>
        {historyList.map((title, index) => (
          <StyledTitleCard
            key={index}
            to={`/title/${title.type.toLowerCase()}/${title.id}`}
          >
            <StyledImage src={title.webpImage} alt="image" />
            <StyledData>
              <StyledTitleName>{title.title}</StyledTitleName>
              <StyledSpan>
                <p>{title.media_type === "Manga" ? "Manga" : "Anime"} | </p>
                <FaStar style={{ color: "gold" }} />
                <p>{title.score}</p>
              </StyledSpan>
              <StyledSpan>
                {/* render tv and episode count */}
                {title.episodes && <IoTvSharp />}
                {title.episodes &&
                  ` ${title.episodes} ${
                    title.episodes > 1 ? "episodes" : "episode"
                  } `}
                {/* render tv and chapter count */}
                {title.chapters && <FaReadme />}
                {title.chapters &&
                  ` ${title.chapters} ${
                    title.chapters > 1 ? "chapters" : "chapter"
                  }`}
                <StyledStatus>{title.status}</StyledStatus>
              </StyledSpan>

              <StyledSynopsis>{title.synopsis}</StyledSynopsis>
            </StyledData>
          </StyledTitleCard>
        ))}
        <StyledSpace />
      </StyledLibrary>
    </>
  );
};

export default History;

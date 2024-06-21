import { useSelector } from "react-redux";
import styled from "styled-components";
import Empty from "../ui/Empty";
import StyledTitleCard from "../components/StyledTitleCard";
import LibrarySynopsis from "../ui/library/LibrarySynopsis";
import LibraryStats from "../ui/library/LibraryStats";
import LibraryName from "../ui/library/LibraryName";
import LibraryImage from "../ui/library/LibraryImage";
import LibraryHeader from "../ui/library/LibraryHeader";

const StyledHistory = styled.section`
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

const History = () => {
  const historyList = useSelector((state) => state.history);

  if (!historyList?.length) return <Empty resource="history" />;

  return (
    <>
      <LibraryHeader heading="History" />
      <StyledHistory>
        {historyList.map((title) => (
          <StyledTitleCard
            key={title.id}
            to={`/title/${title.type.toLowerCase()}/${title.id}`}
          >
            {/*  image */}
            <LibraryImage webp={title.webpImage} />
            <StyledData>
              <LibraryName name={title.title} />

              {/* stats */}
              <LibraryStats
                episodes={title.episodes}
                chapters={title.chapters}
                status={title.status}
                score={title.score}
              />

              {/* synopsis */}
              <LibrarySynopsis synopsis={title.synopsis} />
            </StyledData>
          </StyledTitleCard>
        ))}
      </StyledHistory>
    </>
  );
};

export default History;

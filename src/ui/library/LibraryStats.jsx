import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StyledStatSection = styled.div`
  width: 100%;
  height: 100%;
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
  font-size: x-small;
  align-items: center;
  border-radius: 2.5px;
  justify-content: center;
  background-color: var(--color-grey-300);
`;

const LibraryStats = ({ episodes, chapters, status, score }) => {
  return (
    <StyledStatSection>
      {episodes && `${episodes} ${episodes > 1 ? "episodes" : "episode"}`}
      {chapters && `${chapters} ${chapters > 1 ? "chapters" : "chapter"}`}
      <StyledSpan>
        <FaStar style={{ color: "gold" }} /> {score} |
        <StyledStatus>{status}</StyledStatus>
      </StyledSpan>
    </StyledStatSection>
  );
};

export default LibraryStats;

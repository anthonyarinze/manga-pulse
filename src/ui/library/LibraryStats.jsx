import { FaStar } from "react-icons/fa";
import styled from "styled-components";

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

const LibraryStats = ({ episodes, chapters, status, score }) => {
  return (
    <StyledSpan>
      {episodes && `${episodes} ${episodes > 1 ? "episodes" : "episode"}`}
      {chapters &&
        `${chapters} ${chapters > 1 ? "chapters" : "chapter"}`} |{" "}
      <FaStar style={{ color: "gold" }} /> {score}
      <StyledStatus>{status}</StyledStatus>
    </StyledSpan>
  );
};

export default LibraryStats;

import { FaExternalLinkAlt } from "react-icons/fa";
import styled from "styled-components";

const MangadexButton = styled.button`
  gap: 6px;
  padding: 8px;
  display: flex;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  background-color: #ff6740;

  &:hover {
    filter: brightness(90%);
  }
`;
const Mangadex = ({ openInMangadex }) => {
  return (
    <MangadexButton onClick={openInMangadex}>
      Open in Mangadex <FaExternalLinkAlt />
    </MangadexButton>
  );
};

export default Mangadex;

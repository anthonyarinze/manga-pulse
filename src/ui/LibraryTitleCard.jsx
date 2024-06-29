import styled from "styled-components";
import StyledCardLink from "../components/StyledCardLink";

const StyledTitle = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  min-height: 240px;
  border-radius: 4px;
  align-items: center;
  background-color: var(--color-grey-100);

  &:hover {
    background-color: #293238;
  }

  @media (min-width: 768px) {
  }
`;

const LibraryTitleCard = ({ children, type, id }) => {
  return (
    <StyledCardLink to={`/title/${type.toLowerCase()}/${id}`}>
      <StyledTitle>{children}</StyledTitle>
    </StyledCardLink>
  );
};

export default LibraryTitleCard;

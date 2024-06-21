import styled from "styled-components";

const StyledTitleName = styled.p`
  max-width: 95%;
  overflow: hidden;
  font-weight: 500;
  font-size: 1.7rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const LibraryName = ({ name }) => {
  return <StyledTitleName>{name}</StyledTitleName>;
};

export default LibraryName;

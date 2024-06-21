import styled from "styled-components";

const StyledSynopsis = styled.p`
  max-width: 95%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const LibrarySynopsis = ({ synopsis }) => {
  return <StyledSynopsis>{synopsis}</StyledSynopsis>;
};

export default LibrarySynopsis;

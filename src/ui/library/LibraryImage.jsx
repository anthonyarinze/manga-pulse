import styled from "styled-components";

const StyledImage = styled.img`
  width: 35%;
  max-height: 220px;
  object-fit: fill;
  border-radius: 4px;
`;

const LibraryImage = ({ webp }) => {
  return <StyledImage src={webp} alt="image" />;
};

export default LibraryImage;

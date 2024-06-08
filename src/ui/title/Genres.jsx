import styled from "styled-components";
import Heading from "../Heading";

const StyledTagsContainer = styled.div`
  gap: 8px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0px;
`;

const StyledGenres = styled.div`
  height: 30px;
  padding: 8px;
  display: flex;
  font-size: 14px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isexplicit }) =>
    isexplicit === "Ecchi" ||
    isexplicit === "Erotica" ||
    isexplicit === "Hentai"
      ? "var(--color-red-900)"
      : "var(--color-grey-200)"};
`;

const Genres = ({ genres }) => {
  return (
    <>
      <Heading>Genres</Heading>
      <StyledTagsContainer>
        {genres.map((genre) => (
          <StyledGenres isexplicit={genre.name} key={genre.id}>
            {genre.name}
          </StyledGenres>
        ))}
      </StyledTagsContainer>
    </>
  );
};

export default Genres;

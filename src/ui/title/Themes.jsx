import styled from "styled-components";
import Heading from "../Heading";

const StyledTagsContainer = styled.div`
  gap: 8px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0px;
`;

const StyledThemes = styled.div`
  height: 30px;
  padding: 8px;
  display: flex;
  font-size: 14px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  background-color: ${({ isexplicit }) =>
    isexplicit === "Gore" ||
    isexplicit === "Sexual Violence" ||
    isexplicit === "Hentai"
      ? "var(--color-red-900)"
      : "var(--color-grey-200)"};
`;

const Themes = ({ themes }) => {
  return (
    <>
      <Heading>Themes</Heading>
      <StyledTagsContainer>
        {themes.map((theme) => (
          <StyledThemes isexplicit={theme.name} key={theme.id}>
            {theme.name}
          </StyledThemes>
        ))}
      </StyledTagsContainer>
    </>
  );
};

export default Themes;

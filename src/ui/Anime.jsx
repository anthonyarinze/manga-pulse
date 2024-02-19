import styled from "styled-components";
import { StyledSectionHeader } from "./SectionHeader";

const StyledSection = styled.section`
  width: 100vw;
  height: 350px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: green;
`;

const Anime = () => {
  return (
    <StyledSection>
      <StyledSectionHeader>Anime</StyledSectionHeader>
    </StyledSection>
  );
};

export default Anime;

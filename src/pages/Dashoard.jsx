import styled from "styled-components";
import Anime from "../ui/Anime";
import Manga from "../ui/Manga";

const StyledDashboard = styled.section`
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  margin: 0 12px;
`;

const Dashoard = () => {
  return (
    <StyledDashboard>
      <Anime />
      <Manga />
    </StyledDashboard>
  );
};

export default Dashoard;

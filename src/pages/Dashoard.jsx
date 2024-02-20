import styled from "styled-components";
import Popular from "../ui/Popular";
import Anime from "../ui/Anime";

const StyledDashboard = styled.section`
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Dashoard = () => {
  return (
    <StyledDashboard>
      <Popular />
      <Anime />
    </StyledDashboard>
  );
};

export default Dashoard;

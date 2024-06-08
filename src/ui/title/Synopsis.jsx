import styled from "styled-components";
import Heading from "../Heading";

const StyledSynopsis = styled.span`
  gap: 20px;
  width: 80%;
  display: flex;
  margin-top: 15px;
  flex-direction: column;
`;
const Synopsis = ({ synopsis }) => {
  return (
    <StyledSynopsis>
      <Heading>Synopsis</Heading>
      {synopsis}
    </StyledSynopsis>
  );
};

export default Synopsis;

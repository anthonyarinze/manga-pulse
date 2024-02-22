import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  width: 180px;
  height: 95%;
`;

const StyledCardLink = ({ children, to }) => {
  return (
    <StyledLink to={to} target="_blank">
      {children}
    </StyledLink>
  );
};

export default StyledCardLink;

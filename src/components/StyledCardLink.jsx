import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  width: 200px;
  height: 240px;
`;

const StyledCardLink = ({ children, to }) => {
  return (
    <StyledLink to={to} rel="noopener noreferrer">
      {children}
    </StyledLink>
  );
};

export default StyledCardLink;

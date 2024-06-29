import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledTitle = styled.div`
  display: flex;
  padding: 10px;
  cursor: pointer;
  min-height: 240px;
  max-height: 241px;
  border-radius: 4px;
  align-items: center;
  background-color: var(--color-grey-100);

  &:hover {
    background-color: #293238;
  }

  @media (min-width: 768px) {
  }
`;

const StyledLink = styled(Link)`
  min-height: 240px;
  max-height: 241px;
`;

const StyledTitleCard = ({ children, to }) => {
  return (
    <StyledLink to={to} rel="noopener noreferrer">
      <StyledTitle>{children}</StyledTitle>
    </StyledLink>
  );
};

export default StyledTitleCard;

import styled from "styled-components";
import { BiMenu } from "react-icons/bi";
import Heading from "./Heading";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1.2rem 5rem;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-300);
`;

const StyledButton = styled(BiMenu)`
  font-size: 3rem;
  cursor: pointer;
`;

function Header({ toggleSidebar, isSidebarOpen }) {
  return (
    <StyledHeader>
      {!isSidebarOpen && <StyledButton onClick={toggleSidebar} />}
      <Heading as="h1">Testing</Heading>
    </StyledHeader>
  );
}

export default Header;

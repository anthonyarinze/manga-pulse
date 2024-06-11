import styled from "styled-components";
import { BiMenu } from "react-icons/bi";
import SearchBar from "./header/SearchBar";

const StyledHeader = styled.header`
  display: flex;
  font-size: 3rem;
  align-items: center;
  padding: 1.2rem 5rem;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-300);
`;

const StyledButton = styled(BiMenu)`
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

function Header({ toggleSidebar, issidebaropen }) {
  return (
    <StyledHeader>
      {!issidebaropen && <StyledButton onClick={toggleSidebar} />}
      <SearchBar />
    </StyledHeader>
  );
}

export default Header;

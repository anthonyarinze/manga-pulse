import styled from "styled-components";
import { BiMenu } from "react-icons/bi";
import SearchBar from "./header/SearchBar";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1.2rem 1rem;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-300);

  @media (min-width: 768px) {
    padding: 1.2rem 5rem;
  }
`;

const StyledButton = styled(BiMenu)`
  cursor: pointer;
  margin-left: 0.7rem;
  font-size: 3.4rem;
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

import styled from "styled-components";
import { IoCloseOutline } from "react-icons/io5";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  gap: 3.2rem;
  display: flex;
  grid-row: 1 / -1;
  flex-direction: column;
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-50);
  border-right: 1px solid var(--color-grey-100);
`;

const StyledButton = styled(IoCloseOutline)`
  font-size: 3rem;
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background-color: var(--colors-grey-700);
  }
`;

function Sidebar({ closeSidebar }) {
  return (
    <StyledSidebar>
      <StyledButton onClick={closeSidebar} />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;

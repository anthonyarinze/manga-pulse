import styled from "styled-components";
import MainNav from "./MainNav";
import { IoCloseOutline } from "react-icons/io5";

const StyledSidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 22rem; // Adjust width as necessary
  height: 100%;
  gap: 3.2rem;
  display: flex;
  flex-direction: column;
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-50);
  border-right: 1px solid var(--color-grey-100);
  z-index: 1000; // Ensure it's on top of other elements
`;

const StyledButton = styled(IoCloseOutline)`
  font-size: 3rem;
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background-color: var(--color-grey-700);
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

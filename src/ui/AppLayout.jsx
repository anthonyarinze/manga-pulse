// AppLayout.js
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Main = styled.main`
  overflow: scroll;
  background-color: var(--color-grey-50);
`;

const StyledAppLayout = styled.div`
  width: 100dvw;
  display: grid;
  height: 100dvh;
  overflow: auto;
  grid-template-rows: auto 1fr;
  transition: grid-template-columns 0.3s ease;
  grid-template-columns: ${({ isSidebarOpen }) =>
    isSidebarOpen ? "22rem 1fr" : ""};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 120rem;
  flex-direction: column;
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  };

  return (
    <StyledAppLayout isSidebarOpen={isSidebarOpen}>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      {isSidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  transition: grid-template-columns 0.3s ease;
  grid-template-columns: ${({ isSidebarOpen }) =>
    isSidebarOpen ? "22rem 1fr" : ""};
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  align-items: center;
  background-color: var(--color-grey-50);
`;

const Container = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };

  // Use useEffect to delay the state update until after the render phase
  useEffect(() => {
    // Any logic that needs to run after the render goes here
  }, [isSidebarOpen]);

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

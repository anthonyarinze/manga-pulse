import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { OverlayProvider } from "../contexts/OverlayContext";

const StyledAppLayout = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
  z-index: 500; // Ensure it's below the sidebar but above other content
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((previssidebaropen) => !previssidebaropen);
  };

  localStorage.removeItem("history");

  return (
    <OverlayProvider>
      <StyledAppLayout>
        <Header toggleSidebar={toggleSidebar} issidebaropen={isSidebarOpen} />
        {isSidebarOpen && <Sidebar closeSidebar={toggleSidebar} />}
        {isSidebarOpen && <Overlay onClick={toggleSidebar} />}{" "}
        {/* Overlay to close sidebar on click */}
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </OverlayProvider>
  );
}

export default AppLayout;

import styled from "styled-components";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const StyledBackground = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--auth-color);
`;

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabButton = styled.button`
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background: none;
  margin-right: 10px;
  position: relative;
  transition: color 0.3s ease-in-out;
  color: ${(props) => (props.isActive ? "white" : "grey")};

  &:before {
    left: 0;
    bottom: 0;
    content: "";
    width: 100%;
    position: absolute;
    background-color: #ffb17a;
    transition: height 0.3s ease-in-out;
    height: ${(props) => (props.isActive ? "2px" : "0")};
  }

  &:hover {
    color: #ffb17a;

    &:before {
      height: 2px;
    }
  }
`;

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <StyledBackground>
      <TabsContainer>
        <TabButton
          isActive={activeTab === "login"}
          onClick={() => handleTabChange("login")}
        >
          Login
        </TabButton>
        <TabButton
          isActive={activeTab === "signup"}
          onClick={() => handleTabChange("signup")}
        >
          Signup
        </TabButton>
      </TabsContainer>
      {activeTab === "login" ? <Login /> : <Signup />}
    </StyledBackground>
  );
};

export default Auth;

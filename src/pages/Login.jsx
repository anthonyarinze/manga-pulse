import styled from "styled-components";
import Heading from "../ui/Heading";
import { EmailInput, PasswordInput } from "../ui/AuthInputFields";
import CheckBox from "../ui/CheckBox";

const StyledBackground = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 5rem;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  background-color: var(--auth-color);
`;

const StyledContainer = styled.div`
  width: 80%;
  height: 80%;
`;

const StyledForm = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
`;

const StyledButton = styled.button`
  width: 110px;
  height: 40px;
  font-weight: 600;
  margin-top: 25px;
  border-radius: 4px;
  background-color: #ffb17a;
`;

const Login = () => {
  return (
    <StyledBackground>
      <StyledContainer>
        <Heading as="h1">Login</Heading>
        <Heading as="h5">
          Log into Manga Tracker to keep track of your favorites.
        </Heading>
        <StyledForm>
          <EmailInput />
          <PasswordInput />
          <CheckBox />
        </StyledForm>
        <StyledButton>Login</StyledButton>
      </StyledContainer>
    </StyledBackground>
  );
};

export default Login;

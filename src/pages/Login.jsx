import Form from "../ui/Form";
import CheckBox from "../ui/CheckBox";
import SpinnerMini from "../ui/SpinnerMini";
import FormRow from "../ui/FormRow";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import styled from "styled-components";
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

const StyledDiv = styled.div`
  display: flex;
  margin-top: 50px;
  justify-self: start;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail();
          setPassword();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading as="h2">Pick up where you left off.</Heading>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRow>

      <CheckBox>Remember Me</CheckBox>

      <StyledDiv>
        <FormRow>
          <Button disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : "Login"}
          </Button>
        </FormRow>
      </StyledDiv>
    </Form>
  );
};

export default Login;

import { useState } from "react";
import styled, { css } from "styled-components";

const StyledInput = styled.input`
  width: 80%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 3px;
  border: 1px solid #ccc;
  border-left: 3px solid transparent;
  transition: border-left-color 0.3s ease-in-out;

  ${(props) =>
    props.isActive &&
    css`
      border-left: 8px solid #ffb17a;
    `}
`;

const EmailInput = ({ disabled }) => {
  const [email, setEmail] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // You can add email validation logic here if needed
  };

  return (
    <StyledInput
      type="email"
      placeholder="Email"
      value={email}
      onChange={handleEmailChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isActive={isActive}
      disabled={disabled}
    />
  );
};

const PasswordInput = ({ disabled }) => {
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // You can add password validation logic here if needed
  };

  return (
    <StyledInput
      type="password"
      placeholder="Password"
      value={password}
      onChange={handlePasswordChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isActive={isActive}
      disabled={disabled}
    />
  );
};

export { EmailInput, PasswordInput };

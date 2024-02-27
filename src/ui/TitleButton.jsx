import styled, { css } from "styled-components";

const StyledTitleButton = styled.button`
  width: 45px;
  height: 30px;
  display: flex;
  font-size: 2rem;
  border-radius: 4px;
  text-align: center;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.as === "edit" &&
    css`
      background-color: #ffb17a;
    `}

  ${(props) =>
    props.as === "share" &&
    css`
      background-color: rgb(79, 79, 79);
    `}
`;

const TitleButton = ({ children, onClick, as }) => {
  return (
    <StyledTitleButton as={as} onClick={onClick}>
      {children}
    </StyledTitleButton>
  );
};

export default TitleButton;

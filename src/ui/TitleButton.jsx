import styled, { css } from "styled-components";

const StyledTitleButton = styled.button`
  width: 50px;
  height: 40px;
  display: flex;
  cursor: pointer;
  font-size: 2rem;
  text-align: center;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);

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

      &:hover {
    filter: brightness(90%);
  }
`;

const TitleButton = ({ children, onClick, as }) => {
  return (
    <StyledTitleButton as={as} onClick={onClick}>
      {children}
    </StyledTitleButton>
  );
};

export default TitleButton;

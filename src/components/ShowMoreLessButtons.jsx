import styled from "styled-components";

const ControlShowButton = styled.button`
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
  color: var(--color-grey-800);
  background-color: var(--color-grey-100);
`;

const ShowMoreLessButtons = ({ text, handleClick }) => {
  return <ControlShowButton onClick={handleClick}>{text}</ControlShowButton>;
};

export default ShowMoreLessButtons;

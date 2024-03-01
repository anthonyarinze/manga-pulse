import { useState } from "react";
import styled from "styled-components";

const StyledCheckboxContainer = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  width: 18px;
  height: 18px;
  margin-right: 0.5rem;
`;

const StyledLabel = styled.label`
  font-size: 1.6rem;
  color: var(--color-grey-700);
`;

const CheckBox = () => {
  const [remember, setRemember] = useState(false);

  const handleChange = () => {
    setRemember(!remember);
  };

  return (
    <StyledCheckboxContainer>
      <StyledCheckbox checked={remember} onChange={handleChange} />
      <StyledLabel>Remember me</StyledLabel>
    </StyledCheckboxContainer>
  );
};

export default CheckBox;

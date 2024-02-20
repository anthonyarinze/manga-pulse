import styled from "styled-components";
import Spinner from "./Spinner";

const StyledLoading = styled.div``;

const StyledLabel = styled.h3``;

const Loading = ({ label }) => {
  return (
    <StyledLoading>
      <Spinner />
      <StyledLabel>{label}</StyledLabel>
    </StyledLoading>
  );
};

export default Loading;

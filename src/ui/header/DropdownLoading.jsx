import styled, { keyframes } from "styled-components";

// Define the keyframes for the animation
const l3 = keyframes`
  20% { background-position: 0%   0%, 50%  50%, 100%  50%; }
  40% { background-position: 0% 100%, 50%   0%, 100%  50%; }
  60% { background-position: 0%  50%, 50% 100%, 100%   0%; }
  80% { background-position: 0%  50%, 50%  50%, 100% 100%; }
`;

// Create the loader styled component
const StyledDropdownLoader = styled.div`
  width: 75px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #fff 90%, #0000);
  background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: ${l3} 1s infinite linear;
`;

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
`;

const DropdownLoader = () => {
  return (
    <LoaderContainer>
      <StyledDropdownLoader />
    </LoaderContainer>
  );
};

export default DropdownLoader;

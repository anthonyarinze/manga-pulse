import { useState } from "react";
import styled from "styled-components";
import OverlaySearchBar from "./OverlaySearchBar";

const StyledInput = styled.input`
  width: 100%;
  border: none;
  padding: 9px;
  outline: none;
  color: white;
  font-size: 1.6rem;
  border-radius: 8px;
  margin-right: 12px;
  background-color: var(--color-grey-200);

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const StyledSearchInput = styled.div`
  position: relative;
`;

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const closeOverlay = () => {
    setIsFocused(false);
  };

  return (
    <StyledSearchInput className="search-input">
      <StyledInput type="text" onFocus={handleFocus} placeholder="Search..." />
      {isFocused && <OverlaySearchBar closeOverlay={closeOverlay} />}
    </StyledSearchInput>
  );
};

export default SearchBar;

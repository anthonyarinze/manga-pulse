import styled from "styled-components";
import OverlaySearchBar from "./OverlaySearchBar";
import { useOverlay } from "../../contexts/OverlayContext";

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

// default search bar on the header. on focus, renders the overlay search bar.
const SearchBar = () => {
  const { openOverlay, isOverlayOpen } = useOverlay();

  return (
    <StyledSearchInput className="search-input">
      <StyledInput type="text" placeholder="Search..." onFocus={openOverlay} />
      {isOverlayOpen && <OverlaySearchBar />}
    </StyledSearchInput>
  );
};

export default SearchBar;

import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useEffect, useRef, useState } from "react";
import { useGetSearchResults } from "../../api/useGetSearchResults";
import { IoClose } from "react-icons/io5";
import { useOverlay } from "../../contexts/OverlayContext";
import DropdownLoader from "./DropdownLoading";

const Overlay = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  z-index: 600;
  height: 100%;
  display: flex;
  position: fixed;
  flex-direction: column;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.9);

  @media (min-width: 768px) {
    padding: 0rem 2rem;
    align-items: flex-end; /* Align to the right */
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const StyledInputContainer = styled.div`
  width: 100%;
  max-width: 700px; /* Max width on larger screens */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  padding: 10px;
  outline: none;
  color: white;
  font-size: 1.6rem;
  border-radius: 8px;
  background-color: var(--color-grey-200);
`;

const StyledButton = styled(IoClose)`
  cursor: pointer;
  margin-bottom: 8px;
  font-size: 3.4rem;
  align-self: center;
  justify-self: center;
  border-radius: 100%;

  &:hover {
    background-color: var(--color-grey-200);
  }

  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;

const Container = styled.div`
  gap: 10px;
  width: 100%;
  display: flex;
  max-width: 700px;
  justify-content: space-between;
`;

const LoadingContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  max-width: 700px;
  position: relative;
  align-items: center;
  justify-content: center;
`;

// overlay search bar. triggered when user focuses on the defualt header search.
const OverlaySearchBar = () => {
  const { closeOverlay } = useOverlay();
  const [tempQuery, setTempQuery] = useState("");
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchBarRef = useRef(null);

  const { isLoading, error, data } = useGetSearchResults(query);

  // sets the temporary query as the user types. avoided setting query directly because it fires the api.
  const handleSearchChange = (event) => {
    setTempQuery(event.target.value);
  };

  // sets the query as the val of temp. query and searches when user hits enter.
  // also triggers the dropdown if the query is more than one char.
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setQuery(tempQuery);
      setIsOpen(tempQuery.length > 1);
    }
  };

  // auto focuses the search bar when the overlay is rendered.
  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus(); // Set focus to the search bar when overlay mounts.
    }
  }, []);

  return (
    <Overlay>
      <Container>
        <StyledInputContainer>
          <StyledButton onClick={closeOverlay} />
          <StyledInput
            type="text"
            value={tempQuery}
            ref={searchBarRef}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder={error ? error.message : "Search..."}
          />
          {isOpen && data && <Dropdown results={data} />}
        </StyledInputContainer>
      </Container>
      <LoadingContainer>{isLoading && <DropdownLoader />}</LoadingContainer>
    </Overlay>
  );
};

export default OverlaySearchBar;

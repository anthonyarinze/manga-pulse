import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useEffect, useRef, useState } from "react";
import { useGetSearchResults } from "../../api/useGetSearchResults";
import { IoClose } from "react-icons/io5";
import { useOverlay } from "../../contexts/OverlayContext";

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
  font-size: 3.4rem;
  align-self: center;
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

const OverlaySearchBar = () => {
  const { closeOverlay } = useOverlay();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchBarRef = useRef(null);

  const { isLoading, error, data } = useGetSearchResults(query);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsOpen(query.length > 1);
    }
  };

  useEffect(() => {
    if (searchBarRef.current) {
      searchBarRef.current.focus(); // Set focus to the search bar when overlay mounts.
    }
  }, []);

  return (
    <Overlay>
      <Container>
        <StyledButton onClick={closeOverlay} />
        <StyledInputContainer>
          <StyledInput
            type="text"
            value={query}
            ref={searchBarRef}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            placeholder={error ? error.message : "Search..."}
          />
          {isOpen && data && <Dropdown results={data} isLoading={isLoading} />}
        </StyledInputContainer>
      </Container>
    </Overlay>
  );
};

export default OverlaySearchBar;

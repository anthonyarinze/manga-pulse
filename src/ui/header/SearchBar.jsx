import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { useGetSearchResults } from "../../api/useGetSearchResults";
import { debounce } from "lodash";

const StyledInput = styled.input`
  width: 200px;
  border: none;
  padding: 12px;
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
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchBarRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsOpen(false); // Close dropdown on outside click
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick); // Cleanup
  }, [isOpen]); // Re-attach listener on isOpen changes

  const { isLoading, error, data } = useGetSearchResults(query);

  const debouncedSearch = debounce((q) => {
    if (isFocused) {
      setQuery(q);
    } else return;
  }, 200);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearchChange = (event) => {
    const newQuery = event.target.value;
    if (isFocused) {
      debouncedSearch(newQuery);
    }
    setIsOpen(isFocused && newQuery.length > 1); // Open dropdown on minimum 1 character
  };

  return (
    <StyledSearchInput className="search-input">
      <StyledInput
        type="text"
        value={query}
        ref={searchBarRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleSearchChange}
        placeholder={error ? error.message : "Search..."}
      />
      {isOpen && data && <Dropdown results={data} isLoading={isLoading} />}
    </StyledSearchInput>
  );
};

export default SearchBar;

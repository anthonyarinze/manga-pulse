import styled from "styled-components";
import { BiMenu } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { useGetSearchResults } from "../api/useGetSearchResults";
import SearchResultItem from "../components/SearchResultItem";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "./SpinnerMini";

const StyledHeader = styled.header`
  display: flex;
  font-size: 3rem;
  align-items: center;
  padding: 1.2rem 5rem;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-300);
`;

const StyledButton = styled(BiMenu)`
  cursor: pointer;
  border-radius: 100%;

  &:hover {
    background-color: var(--color-grey-200);
  }
`;

const StyledIcons = styled.div`
  gap: 12px;
  display: flex;
  cursor: pointer;
`;

const StyledIconBubble = styled.div`
  padding: 8px;
  display: flex;
  font-size: 3rem;
  width: fit-content;
  height: fit-content;
  align-items: center;
  border-radius: 100%;
  justify-content: center;
  background-color: var(--color-grey-200);
`;

const StyledDropdown = styled.div`
  top: 70px;
  padding: 8px;
  z-index: 1000;
  height: 295px;
  max-width: 318px;
  min-width: 316px;
  overflow: scroll;
  max-height: 300px;
  position: absolute;
  border-radius: 0 0 8px 8px;
  background-color: var(--color-grey-100);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledSearchBar = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  color: white;
  font-size: 1.6rem;
  border-radius: 8px;
  margin-right: 12px;
  background-color: var(--color-grey-200);
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Header({ toggleSidebar, isSidebarOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [immediateSearchQuery, setImmediateSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const dropDownRef = useRef(null);
  const isSearchBarFocused = useRef(false);
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: searchResults,
  } = useGetSearchResults(debouncedSearchQuery);

  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleImmediateSearchQuery = (event) => {
    const query = event.target.value;
    setImmediateSearchQuery(query);
  };

  // Update search query after a delay to debounce the API calls
  const debouncedSearch = debounce((value) => {
    setDebouncedSearchQuery(value);
    setIsSearchOpen(value.length > 0);
  }, 500);

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsSearchOpen(false);
    }
  };

  const handleSearchBarFocus = () => {
    isSearchBarFocused.current = true;
  };

  const handleSearchBarBlur = () => {
    isSearchBarFocused.current = false;
  };

  useEffect(() => {
    debouncedSearch(immediateSearchQuery);
  }, [immediateSearchQuery, debouncedSearch]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (error) return <p>Error parsing search query. Please try again</p>;

  return (
    <StyledHeader>
      {!isSidebarOpen && <StyledButton onClick={toggleSidebar} />}
      <StyledIcons>
        <StyledSearchBar
          placeholder="Search..."
          value={immediateSearchQuery}
          onBlur={handleSearchBarBlur}
          onFocus={handleSearchBarFocus}
          onChange={handleImmediateSearchQuery}
        />
        {isLoading ? (
          <StyledDiv>
            <SpinnerMini />
          </StyledDiv>
        ) : (
          isSearchOpen &&
          isSearchBarFocused.current &&
          searchResults &&
          searchResults.length > 0 && (
            <StyledDropdown ref={dropDownRef}>
              {searchResults
                .filter((result) => result.englishTitle && result.id)
                .map((result, index) => (
                  <SearchResultItem
                    key={index}
                    id={result.id}
                    webp={result.webp}
                    rating={result.score}
                    status={result.status}
                    episodes={result.episodes}
                    name={result.englishTitle}
                    mediaType={result.mediaType}
                  />
                ))}
            </StyledDropdown>
          )
        )}
      </StyledIcons>
    </StyledHeader>
  );
}

export default Header;

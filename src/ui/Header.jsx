import styled from "styled-components";
import { BiMenu } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi2";
import { useState } from "react";
import { useGetAnime } from "../api/useGetAnime";
import SearchResultItem from "../components/SearchResultItem";

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
  height: 295px;
  max-width: 318px;
  min-width: 316px;
  max-height: 300px;
  overflow: scroll;
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
  font-size: 1.6rem;
  border-radius: 8px;
  margin-right: 12px;
  background-color: var(--color-grey-200);
`;

function Header({ toggleSidebar, isSidebarOpen }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isLoading,
    error,
    // data: { url, mal_id, webp, score, scoredBy, synopsis, defaultTitle },
    data: searchResults,
  } = useGetAnime(searchQuery);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    setIsSearchOpen(query.length > 0);
  };

  return (
    <StyledHeader>
      {!isSidebarOpen && <StyledButton onClick={toggleSidebar} />}
      <StyledIcons>
        <StyledIconBubble>
          <HiOutlineUser />
        </StyledIconBubble>
        <StyledSearchBar
          value={searchQuery}
          placeholder="Search..."
          onChange={handleSearchChange}
        />
        {isSearchOpen && searchResults && searchResults.length > 0 && (
          <StyledDropdown>
            {searchResults.map((result, index) => (
              <SearchResultItem
                key={index}
                url={result.url}
                webp={result.webp}
                rating={result.score}
                status={result.status}
                episodes={result.episodes}
                name={result.englishTitle}
              />
            ))}
          </StyledDropdown>
        )}
      </StyledIcons>
    </StyledHeader>
  );
}

export default Header;

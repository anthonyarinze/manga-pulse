import styled from "styled-components";

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

const SearchBar = ({ value, onBlur, onFocus, onChange }) => {
  return (
    <StyledSearchBar
      placeholder="Search..."
      value={value}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
    />
  );
};

export default SearchBar;

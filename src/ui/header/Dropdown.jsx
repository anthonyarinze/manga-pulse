import styled from "styled-components";
import SearchResultItem from "./SearchResultItem";
import SkeletonItem from "./SkeletonItem";

const StyledDropdown = styled.ul`
  left: 0;
  top: 100%; /* Position below the search bar */
  margin: 0;
  width: 100%;
  padding: 0 8px;
  z-index: 999;
  list-style: none;
  overflow: scroll;
  max-height: 500px;
  position: absolute;
  border-radius: 8px;
  background-color: var(--color-grey-100);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const Dropdown = ({ results, isLoading }) => {
  return (
    <StyledDropdown>
      {isLoading ? (
        <SkeletonItem />
      ) : (
        results.map((result, index) => (
          <SearchResultItem key={index} result={result} />
        ))
      )}
    </StyledDropdown>
  );
};

export default Dropdown;

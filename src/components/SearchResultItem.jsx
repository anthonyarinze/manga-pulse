import styled from "styled-components";

const StyledSearchResultItem = styled.div`
  padding: 8px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  font-size: 1.4rem;
  margin-bottom: 5px;
  border-radius: 8px;
  align-items: center;
  justify-content: start;
  transition: all 0.1s ease;
  background-color: #2c2c2c;
  border: 1px solid var(--color-grey-300);

  &:hover {
    border: 2px solid var(--color-grey-300);
    background-color: var(--color-grey-100);
  }
`;

const StyledImg = styled.img`
  width: 50px;
  height: 70px;
  border: none;
  margin-left: 5px;
  border-radius: 8px;
`;

const StyledBody = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  margin-left: 8px;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledTitle = styled.h5`
  color: white;
  overflow: hidden;
  margin-bottom: 0;
  text-overflow: ellipsis;
`;

const StyledDetails = styled.span``;

const StyledStatus = styled.p`
  height: 20px;
  font-size: smaller;
`;

const SearchResultItem = ({ webp, name, rating, status, episodes }) => {
  return (
    <StyledSearchResultItem>
      <StyledImg src={webp} alt="img" />
      <StyledBody>
        <StyledTitle>{name}</StyledTitle>
        <StyledDetails>
          {rating} • {episodes}
        </StyledDetails>
        <StyledStatus>{status}</StyledStatus>
      </StyledBody>
    </StyledSearchResultItem>
  );
};

export default SearchResultItem;

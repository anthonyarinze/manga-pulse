import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const PageButton = styled.button`
  border: none;
  margin: 0 5px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 3px;
  color: ${({ active }) => (active ? "#fff" : "#000")};
  background-color: ${({ active }) => (active ? "#007bff" : "white")};

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#999")};
  }
`;

const EllipsisButton = styled.button`
  margin: 0 5px;
  border: none;
  cursor: default;
  padding: 5px 10px;
  color: white;
  background-color: transparent;
`;

const StyledSpace = styled.div`
  padding: 1rem;
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxVisiblePages = 5;
  const pageButtons = [];

  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageButtons = () => {
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        Math.abs(i - currentPage) < maxVisiblePages / 2
      ) {
        pageButtons.push(
          <PageButton
            key={i}
            onClick={() => handleClick(i)}
            active={i === currentPage}
          >
            {i}
          </PageButton>
        );
      } else if (
        pageButtons[pageButtons.length - 1]?.props.children !== "..."
      ) {
        pageButtons.push(<EllipsisButton key={i}>...</EllipsisButton>);
      }
    }
  };

  renderPageButtons();

  return (
    <>
      <PaginationContainer>{pageButtons}</PaginationContainer>
      <StyledSpace />
    </>
  );
};

export default Pagination;

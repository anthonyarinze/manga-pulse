import styled from "styled-components";
import Heading from "../Heading";
import StatusFilter from "../StatusFilter";

const StyledHeaderSpan = styled.span`
  display: flex;
  padding: 0px 2rem;
  align-items: center;
  justify-content: space-between;
`;

const LibraryHeader = ({ selectedStatus, handleStatusChange, heading }) => {
  return (
    <StyledHeaderSpan>
      <Heading as="h4" style={{ margin: "1rem 0rem" }}>
        {heading}
      </Heading>
      {selectedStatus && (
        <StatusFilter
          selectedStatus={selectedStatus}
          onSelectStatus={handleStatusChange}
        />
      )}
    </StyledHeaderSpan>
  );
};

export default LibraryHeader;

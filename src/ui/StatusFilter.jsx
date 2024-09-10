import styled from "styled-components";

const StyledSelect = styled.select`
  padding: 3px;
  cursor: pointer;
  max-height: 30px;
  border-radius: 4px;
`;

// filter component
const StatusFilter = ({ selectedStatus, onSelectStatus }) => {
  const statusOptions = [
    "All",
    "Watching",
    "Reading",
    "On Hold",
    "Dropped",
    "Plan to Watch",
    "Plan to Read",
    "Completed",
  ];

  return (
    <StyledSelect
      value={selectedStatus}
      onChange={(e) => onSelectStatus(e.target.value)}
    >
      {statusOptions.map((status, index) => (
        <option key={index} value={status}>
          {status}
        </option>
      ))}
    </StyledSelect>
  );
};

export default StatusFilter;

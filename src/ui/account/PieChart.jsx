import styled from "styled-components";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const PieChart = () => {
  return <ChartBox>PieChart</ChartBox>;
};

export default PieChart;

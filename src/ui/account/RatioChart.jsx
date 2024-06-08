import styled from "styled-components";
import Heading from "../Heading";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { useGetLibrary } from "../../api/useGetLibrary";

const ChartBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  border: var(--color-grey-100);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const RatioChart = () => {
  const { titles, isLoading, error } = useGetLibrary();
  console.log(titles);
  return (
    <ChartBox>
      <Heading as="h2">Ratio</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie></Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default RatioChart;

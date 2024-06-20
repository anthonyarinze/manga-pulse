import styled from "styled-components";
import Heading from "../Heading";
import { useGetLibrary } from "../../api/useGetLibrary";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const StyledChartBox = styled.div`
  width: 80%;
  height: 270px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: var(--shadow-md);
  background-color: var(--color-grey-100);

  @media (min-width: 758px) {
    width: 70%;
  }
`;

const RatioChart = () => {
  const { titles, error } = useGetLibrary();

  const countManga =
    titles?.filter((title) => title.media_type === "Manga").length || 0;
  const countAnime =
    titles?.filter((title) => title.media_type !== "Manga").length || 0;

  const data = [
    { name: `Manga (${countManga})`, value: countManga },
    { name: `Anime (${countAnime})`, value: countAnime },
  ];

  const COLORS = ["var(--color-grey-500)", "#FF8042"];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (error) <Heading as="h4">{error.message}</Heading>;
  if (!titles || !titles.length) return <p>No library entries found.</p>; // Show message if no titles

  return (
    <StyledChartBox>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </StyledChartBox>
  );
};

export default RatioChart;

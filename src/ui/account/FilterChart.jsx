import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetLibrary } from "../../api/useGetLibrary";

const FilterChart = () => {
  const { titles, error } = useGetLibrary();

  if (error) return <div>Error Loading data.</div>;
  if (!titles) return <div>Loading...</div>;

  // count number of titles for each status
  const statusCount = titles.reduce((acc, title) => {
    const status = title.status;
    if (!acc[status]) {
      acc[status] = 0;
    }
    acc[status]++;
    return acc;
  }, {});

  // convert the count object to an array for recharts
  const data = Object.keys(statusCount).map((status) => ({
    Name: status,
    Count: statusCount[status],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Count"
          fill="#8884d8"
          activeBar={<Rectangle fill="#8884d8" stroke="white" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FilterChart;

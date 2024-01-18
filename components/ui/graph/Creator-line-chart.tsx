import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1", Total: 300, amt: 400 },
  { name: "2", Total: 600 },
  { name: "3", Total: 200 },
  { name: "4", Total: 800 },
  { name: "5", Total: 500 },
  { name: "6", Total: 200 },
  { name: "7", Total: 600 },
  { name: "8", Total: 200 },
  { name: "9", Total: 200 },
  { name: "10", Total: 300 },
  { name: "11", Total: 400 },
  { name: "12", Total: 600 },
];

const customYAxisTicks = [0, 100, 200, 300, 400, 500, 600, 700];

function CreatorChart() {
  return (
    <div className="px-5 chart space-y-10">
      <div className="title">Last 6 Months (Revenue)</div>
      <ResponsiveContainer width="100%" className="min-h-96">
        <AreaChart width={500} height={250} data={data}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2063F2" stopOpacity={0.8 + 0.2} />
              <stop offset="95%" stopColor="#2063F2" stopOpacity={0 + 1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis stroke="gray" ticks={customYAxisTicks} domain={[0, 700]} />
          <CartesianGrid
            strokeDasharray="3 3"
            className="chartGrid"
            style={{ stroke: "Background" }}
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CreatorChart;

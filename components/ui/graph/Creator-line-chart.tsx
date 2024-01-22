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
  { name: "1", Total: 0, amt: 400 },
  { name: "2", Total: 200 },
  { name: "3", Total: 230 },
  { name: "4", Total: 320 },
  { name: "5", Total: 410 },
  { name: "6", Total: 380 },
  { name: "7", Total: 360 },
  { name: "8", Total: 400 },
  { name: "9", Total: 500 },
  { name: "10", Total: 600 },
  { name: "11", Total: 580 },
  { name: "12", Total: 600 },
];

const customYAxisTicks = [0, 100, 200, 300, 400, 500, 600, 700];

function CreatorChart() {
  return (
    <div className="pt-12 px-6 ">
      
      <ResponsiveContainer  width="100%" className='min-h-96' >
        <AreaChart width={200} height={250} data={data}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="100%" stopColor="#2063F2" stopOpacity={1} />
              <stop offset="95%" stopColor="#2063F2" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis stroke="gray" className="text-[12px]" ticks={customYAxisTicks}  />
          <CartesianGrid
            strokeDasharray="1 1"
            stroke="gray"
            className=""
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
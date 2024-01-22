// import React from "react";
// import { PieChart, Pie, Legend, Cell } from "recharts";

// const data = [
//   { name: "E-books 10.5k", value: 400, fill: "#04042A" },
//   { name: "Services 5k", value: 300, fill: "#2063F2" },
//   { name: "Art items 9k", value: 300, fill: "#FF73AE" },
// ];

// const renderColorfulLegendText = (value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined, entry: any) => {
//   return (
//     <span style={{ color: 'white', fontWeight: 500, }}>
//       {value}
//     </span>
//   );
// };

// const Doughnutt = () => {
//   const isMobile = window.innerWidth <= 768;

//   return (
//     <div >
//       <PieChart className="min-h-96 min-w-60">
//       <Legend
//           height={isMobile ? 60 : 120}
//           iconType="circle"
//           layout={isMobile ? "horizontal" : "vertical"}
//           verticalAlign="middle"
//           align="right"
//           iconSize={isMobile ? 10 : 20}
//           formatter={renderColorfulLegendText}
//         />
//         <Pie
//           data={data}
//           cx={isMobile ? 150 : 130}
//           cy={200}
//           innerRadius={isMobile ? 60 : 80}
//           outerRadius={isMobile ? 120 : 130}
//           fill="#8884d8"
//           paddingAngle={0}
//           dataKey="value"
//         >
 
//         </Pie>
 
//       </PieChart>
//     </div>
//   );
// };

// export default Doughnutt;


import React from "react";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";

const data01 = [
  { name: "Art 10.5k", value: 35 },
  { name: "E-books 5k", value: 25 },
  { name: "Photography 9k", value: 30 },
];

const COLORS = [" #2063F2", "#04042A ", '#FF73AE'];

const Bullet = ({ backgroundColor, size }:any) => {
  return (
    <div
      className="CirecleBullet rounded-full"
      style={{
        backgroundColor,
        width: size,
        height: size,
      }}
    ></div>
  );
};

const CustomizedLegend = (props: { payload: any; }) => {
  const { payload } = props;
  return (
    <ul className="LegendList flex flex-col gap-3  absolute right-0 bottom-24" >
      {payload.map((entry: { payload: { fill: any; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: any) => (
        <li key={`item-${index}`} className="flex items-center">
          <div className="BulletLabel  flex items-center gap-2">
            <Bullet backgroundColor={entry.payload.fill} size="26px" />
            <div className="BulletLabelText">{entry.value}</div>
          </div>
          {/* <div style={{ marginLeft: "10px" }}>{entry.payload.value}</div> */}
        </li>
      ))}
    </ul>
  );
};

const CustomLabel = ({ viewBox, labelText, value }:any) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy}
        className=""
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="15"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 3}
        className="recharts-text recharts-label text-white"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fill="white"
        fontSize="26"
        fontWeight="600"
      >
        {value}
      </text>
    </g>
  );
};

const Doughnutt = () => {
  return (
    <div className="w-full min-h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data01}
            dataKey="value"
            cx={160}
            cy={250}
            innerRadius={60}
            outerRadius={130}
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
            <Label
              content={<CustomLabel labelText="" value={'30.5k'} viewBox={undefined} />}
              position="center"
            />
          </Pie>
          <Legend content={<CustomizedLegend payload={undefined} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Doughnutt;





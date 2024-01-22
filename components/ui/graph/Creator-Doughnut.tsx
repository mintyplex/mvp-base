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
      className="CirecleBullet  rounded-full"
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
    <ul className="LegendList  flex flex-col gap-3  absolute right-0 md:right-10 bottom-40 md:bottom-24">
      {payload.map((entry: { payload: { fill: any; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: any) => (
        <li key={`item-${index}`} className="flex items-center">
          <div className="BulletLabel flex items-center gap-2">
            <Bullet backgroundColor={entry.payload.fill} size="20px" />
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
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="15"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 5}
        className="recharts-text recharts-label"
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
  const isMobile = window.innerWidth <= 768;
  return (
    <div className="flex w-full h-96">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data01}
            dataKey="value"
            cx={ isMobile ? '90' : '130'}
            cy={isMobile ? '160' :240}
            innerRadius={ isMobile ? '50' :' 60'}
            outerRadius={ isMobile ? '90' : '120'}
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

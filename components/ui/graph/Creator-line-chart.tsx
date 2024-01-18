import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: 'bottom' as const,
      },
      title: {
        display: true,
        // text: 'Chart.js Line Chart',
      },
    },
 
  };
  
  const labels = ['1 / 12', '2/ 12', '3 / 12', '4 / 12', '5 / 12', '6 / 12', '7 / 12'];
  const inputData = [200, 400, 500, 700, 800, 500, 300];
  
  export const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'ss',
        data: inputData,
  
        backgroundColor: (ctx: {
          chart: {
            canvas: {
              getContext: (
                arg0: string
              ) => {
                (): any;
                new (): any;
                createLinearGradient: {
                  (
                    arg0: number,
                    arg1: number,
                    arg2: number,
                    arg3: number
                  ): any;
                  new (): any;
                };
              };
            };
          };
        }) => {
          const gradient = ctx.chart.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, '#4339F2'); // Start color
          gradient.addColorStop(1, '#4339F2'); // End color with alpha 0 (transparent)
          return gradient;
        },
        tension: 0.4,
      },
      
    ],
  };
  
  export function CreatorChart() {
    return (
      <div className=' rounded-lg'>
        <p className='py-4 px-2  text-2xl font-medium border-[rgba(233,239,254,1)] border-b-2'>
          Product Overview
        </p>
        <Line options={options}  data={data}   />
      </div>
    );
  }
  
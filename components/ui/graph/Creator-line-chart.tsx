// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Filler,
//     Legend,
//   } from 'chart.js';
//   import { Line } from 'react-chartjs-2';
//   import {faker} from 'faker';


  
//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Filler,
//     Legend
//   );
  
//   export const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//         // position: 'bottom' as const,
//       },
//       title: {
//         display: true,
//         // text: 'Chart.js Line Chart',
//       },
//     },
//   };
  
//   const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
//   export const data = {
//     labels,
//     datasets: [
//       {
//         fill: true,
//         label: '',
//         data: labels.map(() => faker.random.number({ min: 0, max: 800 })), // Use faker.random.number for random number generation
//         borderColor: '#6865E7',
//         backgroundColor: (ctx: { chart: { canvas: { getContext: (arg0: string) => { (): any; new(): any; createLinearGradient: { (arg0: number, arg1: number, arg2: number, arg3: number): any; new(): any; }; }; }; }; }) => {
//           const gradient = ctx.chart.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
//           gradient.addColorStop(0, '#4745A4'); // Start color
//           gradient.addColorStop(1, 'rgba(71, 69, 164, 0.00)'); // End color with alpha 0 (transparent)
//           return gradient;
//         },
//         tension: 0.4,
//       },
//     ],
//   };
  
//   export function CreatorLineChart() {
//     return (
//       <div className='bg-white p-2 rounded-lg'>
//         <select
//           name=''
//           id=''
//           className='block p-2 mb-6 text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
//         >
//           <option value='View all exchange rate'>View all exchange rate</option>
//         </select>
//         <Line options={options} data={data} />
//       </div>
//     );
//   }
  
import React from 'react';

interface Cell {
  content: string | number | React.ReactNode;
  type?: string; // Add a 'type' property for styling if needed
}

interface Row {
  cells: Cell[];
}

interface ReusableTableProps {
  headers: string[];
  data: Row[];
} 

const ReusableTable: React.FC<ReusableTableProps> = ({ headers, data }) => {
  return (
<>
<div className="overflow-hidden max-w-[90vw] mt-6 md:max-w-[90vw] ">
  
<div className="overflow-x-auto sm:mx-0.5">
      <table className="min-w-full overflow-x-auto">
        <thead className="rounded-lg">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="text-sm font-medium px-6 py-4 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='border rounded-lg border-[rgb(127,127,128)]'>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className='bg-[#2C2D2E] border-b rounded-lg border-b-[rgb(127,127,128)]'>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} className={`px-6 py-4 whitespace-nowrap rounded-lg text-sm font-medium ${cell.type || ''}`}>
                  {cell.content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
</div>
 <div className="flex gap-4 my-5 items-center">
 <button className="py-2 px-4 bg-[#9F9F9F] cursor-pointer rounded-lg">
   Previous
 </button>
 <button className="py-2 px-4 text-[16px] font-[600] bg-blue-500 cursor-pointer rounded-lg">
   5
 </button>
 <button className="py-2 px-4 bg-[#9F9F9F] cursor-pointer rounded-lg">
   Next
 </button>
</div>
</>
  );
};

export default ReusableTable;

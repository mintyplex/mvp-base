import React from "react";

function ReusableTable({ headers, data }: ReusableTableProps) {
  return (
    <>
      <div className="overflow-hidden max-w-[90vw] mt-6 md:max-w-[90vw] ">
        <div className="overflow-x-auto sm:mx-0.5">
          <table className="min-w-full overflow-x-auto">
            <thead className="rounded-lg">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border rounded-lg border-[rgb(127,127,128)]">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-[#2C2D2E] border-b rounded-lg border-b-[rgb(127,127,128)]"
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-6 py-4 whitespace-nowrap rounded-lg text-sm font-medium ${
                        cell.type || ""
                      }`}
                    >
                      {cell.content}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center my-5 gap-4">
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
}

export default ReusableTable;

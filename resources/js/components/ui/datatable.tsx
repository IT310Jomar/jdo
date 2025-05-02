import { useEffect, useRef } from 'react';
import { DataTable } from 'simple-datatables';
import 'simple-datatables/dist/style.css';

interface Props {
  columns: string[];
  data: (string | number)[][];
}

function Table({ columns, data }: Props) {
  const tableRef = useRef<HTMLTableElement>(null);
  const dataTableRef = useRef<DataTable | null>(null); 

  useEffect(() => {
    if (tableRef.current && !dataTableRef.current) {
      dataTableRef.current = new DataTable('#studentTable', {
        searchable: true,
        sortable: true,
        perPage: 10,
        perPageSelect: [10, 20, 30, 50,100,500],
        nextPrev: true,
      });
      
    }
    

   
    return () => {
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
        dataTableRef.current = null;
      }
    };
  }, []); 

  useEffect(() => {
    if (dataTableRef.current && tableRef.current) {
      dataTableRef.current.update(); 
    }
  }, [data]); 

  return (
    
    <div className="overflow-x-auto">
      <table
        ref={tableRef}
        id="studentTable"
        className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3 border dark:border-gray-600 bg-blue-200">
                <span className="flex items-center">{col}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  className={`px-6 py-4 border dark:border-gray-600 ${
                    colIdx === 1
                      ? 'font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };

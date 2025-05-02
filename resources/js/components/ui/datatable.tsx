
import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'simple-datatables';
import 'simple-datatables/dist/style.css';

interface Props {
  columns: string[];
  data: (string | number)[][];
}

function Table({ columns, data }: Props) {
  const tableRef = useRef<HTMLTableElement>(null);
  const dataTableRef = useRef<DataTable | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!tableRef.current || data.length === 0) return;

    // Destroy old instance
    if (dataTableRef.current) {
      dataTableRef.current.destroy();
      dataTableRef.current = null;
    }

    setReady(false);
    const dt = new DataTable(tableRef.current, {
      searchable: true,
      sortable: true,
      perPage: 10,
      perPageSelect: [10, 20, 50, 100, 500, 1000],
    });

    dataTableRef.current = dt;

    setTimeout(() => {

      setReady(true);
    }, 100);

    return () => {
      if (dataTableRef.current) {
        dataTableRef.current.destroy();
        dataTableRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="overflow-x-auto">
      <table
        ref={tableRef}
        style={{
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        className="min-w-full text-sm  text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col, idx) => (
            <th
            key={idx}
            className="px-6 py-3 border bg-blue-200 dark:border-gray-600"
          >
            {col}
          </th>
          
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  className={`px-6 py-4 border dark:border-gray-600 ${colIdx === 1 ? 'font-medium text-gray-900 whitespace-nowrap dark:text-white' : ''
                    }`}
                >
                  {/* ✅ Render JSX or text */}
                  {typeof cell === 'string' || typeof cell === 'number' ? cell : <>{cell}</>}
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


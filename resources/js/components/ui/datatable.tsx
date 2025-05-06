
import '/resources/css/custom.css';
import DataTable from 'react-data-table-component';
import { useState, JSX } from 'react';
import { Input } from '@/components/ui/input';

interface Props {
  columns: string[];
  data: (string | number | JSX.Element)[][];
}

export function Table({ columns, data }: Props) {
  const [filterText, setFilterText] = useState('');

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#bfdbfe', 
        fontWeight: 'bold' as const,
      },
    },
    headCells: {
      style: {
        textAlign: 'left' as const,
      },
    },
    cells: {
      style: {
        textAlign: 'left' as const,
      },
    },
  };

  const centeredColumns = ['action'];

  const columnDefs = columns.map((col, colIdx) => {
    const normalizedCol = col.trim().toLowerCase();
    const isCentered = centeredColumns.includes(normalizedCol);
    let width: string | undefined;

  switch (normalizedCol) {
    case 'no.':
      width = '80px';
      break;
    case 'action':
      width = '200px';
      break;
    case 'first name':
      width = '200px';
      break;
    case 'middle name':
      width = '200px';
      break;
    case 'last name':
      width = '200px'; 
      break;
    default:
      width = undefined;
  }

    return {
      name: col,
      selector: (row: any) => row[`col${colIdx}`],
      sortable: normalizedCol !== 'action',
      cell: (row: any) => row[`col${colIdx}`],
      wrap: true,
      center: isCentered ? true : undefined,  
      width,
    };
  });
  

  const dataRows = data.map((row) => {
    const rowObj: { [key: string]: string | number | JSX.Element } = {};
    row.forEach((cell, colIdx) => {
      rowObj[`col${colIdx}`] = cell;
    });
    return rowObj;
  });

  const filteredRows = dataRows.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string'
        ? value.toLowerCase().includes(filterText.toLowerCase())
        : false
    )
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-end mb-3 p-2">
        <Input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-64"
        />
      </div>
      <DataTable
        columns={columnDefs}
        data={filteredRows}
        pagination
        highlightOnHover
        responsive
        persistTableHead
        customStyles={customStyles}
      />
    </div>
  );
}


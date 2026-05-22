'use client';

import { ReactNode } from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((item: T) => ReactNode);
    className?: string;
  }[];
  isLoading?: boolean;
}

export function DataTable<T extends { id: string | number }>({ data, columns, isLoading }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFD700] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-white/20">
        No records found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            {columns.map((column, idx) => (
              <th 
                key={idx} 
                className={`px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
              {columns.map((column, idx) => (
                <td 
                  key={idx} 
                  className={`px-6 py-4 text-sm text-white/70 ${column.className || ''}`}
                >
                  {typeof column.accessor === 'function' 
                    ? column.accessor(item) 
                    : (item[column.accessor] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';

interface TableHeadersProps {
  headers: string[];
}

export const TableHeaders: React.FC<TableHeadersProps> = ({ headers }) => (
  <tr>
    {headers.map(header => (
      <th key={header}>
        {header}
      </th>
    ))}
  </tr>
);

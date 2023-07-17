import React from 'react';

const headers = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const TableHeaders: React.FC = () => (
  <tr>
    {headers.map(header => (
      <th key={header}>
        {header}
      </th>
    ))}
  </tr>
);

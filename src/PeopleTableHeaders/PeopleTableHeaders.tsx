import React from 'react';

const tableHeaders = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTableHeaders: React.FC = () => (
  <thead>
    <tr>
      {tableHeaders.map(header => (
        <th key={header}>{header}</th>
      ))}
    </tr>
  </thead>
);

import React from 'react';

type Props = {
  values: string[];
};

export const TableHeader: React.FC<Props> = ({ values }) => {
  return (
    <thead>
      <tr>
        {values.map((value: string) => (
          <th key={value}>{value}</th>
        ))}
      </tr>
    </thead>
  );
};

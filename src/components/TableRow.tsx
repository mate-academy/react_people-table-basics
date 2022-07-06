import React from 'react';

type Props = {
  person: Person,
  key: string,
};

export const TableRow: React.FC<Props> = ({ person, key }) => {
  return (
    <tr key={key} className="person">
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.fatherName || '-'}</td>
      <td>{person.motherName || '-'}</td>
    </tr>
  );
};

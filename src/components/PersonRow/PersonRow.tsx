import React from 'react';
import './PersonRow.scss';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="table-row">
      <td className="table-row__data">{person.name}</td>
      <td className="table-row__data">{person.sex}</td>
      <td className="table-row__data">{person.born}</td>
      <td className="table-row__data">{person.died}</td>
      <td className="table-row__data">
        {person.motherName || 'no information' }
      </td>
      <td className="table-row__data">
        {person.fatherName || 'no information' }
      </td>
    </tr>
  );
};

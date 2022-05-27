import React from 'react';
import './PersonRow.scss';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tbody>
      <tr>
        <th className="personRow">{person.name}</th>
        <th className="personRow">{person.sex}</th>
        <th className="personRow">{person.born}</th>
        <th className="personRow">{person.died}</th>
        <th className="personRow">{person.motherName || '--'}</th>
        <th className="personRow">{person.fatherName || '--'}</th>
      </tr>
    </tbody>
  );
};

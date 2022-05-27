import React from 'react';
import './PersonalRow.scss';

type Props = {
  person: People,
};

export const PersonalRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person">
      <td className="Person__title">{person.name}</td>
      <td className="Person__title">{person.sex}</td>
      <td className="Person__title">{person.born}</td>
      <td className="Person__title">{person.died}</td>
      <td className="Person__title">{person.motherName}</td>
      <td className="Person__title">{person.fatherName}</td>
    </tr>
  );
};

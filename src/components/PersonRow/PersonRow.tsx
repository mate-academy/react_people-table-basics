import React from 'react';
import './PersonRow.scss';

interface Props {
  person: Person,
}

const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="person">
      <td className="person__item">{person.name}</td>
      <td className="person__item">{person.sex}</td>
      <td className="person__item">{person.born}</td>
      <td className="person__item">{person.died}</td>
      <td className="person__item">{person.motherName}</td>
      <td className="person__item">{person.fatherName}</td>
    </tr>
  );
};

export default PersonRow;

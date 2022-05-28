import React from 'react';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="row">
      <td className="row">{person.name}</td>
      <td className="row">{person.sex}</td>
      <td className="row">{person.born}</td>
      <td className="row">{person.died}</td>
      <td className="row">{person.motherName}</td>
      <td className="row">{person.fatherName}</td>
    </tr>
  );
};

import React from 'react';

interface Props {
  person: Person,
}

const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="person">
      <td className="person__name">{person.name}</td>
      <td className="person__sex">{person.sex}</td>
      <td className="person__born">{person.born}</td>
      <td className="person__died">{person.died}</td>
      <td className="person__mother">{person.motherName}</td>
      <td className="person__father">{person.fatherName}</td>
    </tr>
  );
};

export default PersonRow;

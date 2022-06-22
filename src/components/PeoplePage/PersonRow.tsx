import React from 'react';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tbody>
      <tr>
        <td>{person.name}</td>
        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{person.motherName || 'no info'}</td>
        <td>{person.fatherName || 'no info'}</td>
      </tr>
    </tbody>
  );
};

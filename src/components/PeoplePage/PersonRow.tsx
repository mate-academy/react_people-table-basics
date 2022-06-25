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
        <td>{person.mother?.name || 'no info'}</td>
        <td>{person.father?.name || 'no info'}</td>
      </tr>
    </tbody>
  );
};

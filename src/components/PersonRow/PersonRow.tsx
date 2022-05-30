import React from 'react';

type Props = {
  person: People;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName || 'no information' }</td>
      <td>{person.fatherName || 'no information' }</td>
    </tr>
  );
};

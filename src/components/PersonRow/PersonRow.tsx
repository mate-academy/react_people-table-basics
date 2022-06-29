import React from 'react';

type Props = {
  person: PersonWithParents,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr
      className="Person"
    >
      <td>{person.name}</td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother?.name || 'no mother'}</td>
      <td>{person.father?.name || 'no father'}</td>
    </tr>
  );
};

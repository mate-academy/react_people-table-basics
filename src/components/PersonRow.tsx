import React from 'react';

interface Props {
  person: Person,
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>
        {person.sex === 'm'
          ? 'Man'
          : 'Woman'}
      </td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.mother?.name || 'no info'}</td>
      <td>{person.father?.name || 'no info'}</td>
    </tr>
  );
};

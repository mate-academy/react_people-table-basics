import React from 'react';

type Props = {
  person: PersonWithParents;
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.mother?.name || '-'}</td>
    <td>{person.father?.name || '-'}</td>
  </tr>
);

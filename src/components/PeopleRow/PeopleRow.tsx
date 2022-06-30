import React from 'react';

type Props = {
  person: Person,
};

export const PeopleRow: React.FC<Props> = ({ person }) => {
  return (
    <tr className="Person">
      <th>{person.name}</th>
      <th>{person.sex === 'f' ? 'Female' : 'Male'}</th>
      <th>{person.born}</th>
      <th>{person.died}</th>
      <th>{person.mother?.name || '-'}</th>
      <th>{person.father?.name || '-'}</th>
    </tr>
  );
};

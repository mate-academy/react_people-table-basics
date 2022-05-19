import React from 'react';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = React.memo(
  ({ person }) => (
    <>
      <td>{person.name}</td>
      <td>{person.sex === 'f' ? 'Female' : 'Male'}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName}</td>
      <td>{person.fatherName}</td>
    </>
  ),
);

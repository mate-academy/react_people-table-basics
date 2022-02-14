import React from 'react';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => (
  <>
    <td>{person.name}</td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>
    <td>{person.motherName || 'unknown'}</td>
    <td>{person.fatherName || 'unknown'}</td>
  </>
);

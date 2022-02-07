import React from 'react';
// Types
import { Person } from '../../types/Person/Person';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <>
      <td className="PeopleTable__Person">{name}</td>
      <td className="PeopleTable__Person">{sex}</td>
      <td className="PeopleTable__Person">{born}</td>
      <td className="PeopleTable__Person">{died}</td>
      <td className="PeopleTable__Person">{motherName || 'Unknown'}</td>
      <td className="PeopleTable__Person">{fatherName || 'Unknown'}</td>
    </>
  );
};

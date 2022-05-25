import React from 'react';

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
    <tbody>
      <tr>
        <th>{name}</th>
        <th>{sex}</th>
        <th>{born}</th>
        <th>{died}</th>
        <th>{motherName || '-/-'}</th>
        <th>{fatherName || '-/-'}</th>
      </tr>
    </tbody>
  );
};

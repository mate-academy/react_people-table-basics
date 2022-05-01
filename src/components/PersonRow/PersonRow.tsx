import React from 'react';

type Props = {
  person: UpdatedPersons,
};

export const PeopleRow: React.FC<Props> = ({ person }) => {
  const {
    name, sex, born, died, fatherName, motherName,
  } = person;

  return (
    <tr
      className="Person"
    >
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{fatherName}</td>
      <td>{motherName}</td>
    </tr>
  );
};

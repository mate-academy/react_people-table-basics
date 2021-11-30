import React from 'react';

interface Props {
  person: P,
}

export const Person: React.FC<Props> = ({ person }) => {
  const {
    name, sex, born, died, fatherName, motherName,
  } = person;

  return (
    <tr className="person">
      <td>{name}</td>
      <td>{sex === 'm' ? 'man' : 'woman'}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{fatherName}</td>
      <td>{motherName}</td>
    </tr>
  );
};

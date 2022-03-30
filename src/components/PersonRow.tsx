import React from 'react';

export const PersonRow:
React.FC<{ person: UserFromServerType }> = ({ person }) => {
  const {
    name, sex, born, died, motherName, fatherName,
  } = person;

  return (
    <tr>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
};

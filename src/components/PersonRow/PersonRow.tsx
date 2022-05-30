import React from 'react';

type Props = {
  person: People;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name, sex, born, died, fatherName, motherName,
  } = person;

  return (
    <tr>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{motherName || 'no information' }</td>
      <td>{fatherName || 'no information' }</td>
    </tr>
  );
};

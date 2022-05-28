import React from 'react';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name, sex, born, died, fatherName, motherName, slug,
  } = person;

  return (
    <tr key={slug}>
      <td>{name}</td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {fatherName
        ? <td>{fatherName}</td>
        : <td>...</td>}
      {motherName
        ? <td>{motherName}</td>
        : <td>...</td>}
    </tr>
  );
};

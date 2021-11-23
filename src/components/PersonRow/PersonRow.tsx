import React from 'react';
import './PersonRow.scss';

interface Props {
  person: PreparedHuman;
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    mother,
    father,
  } = person;

  return (
    <tr>
      <td className="column">{name}</td>
      <td className="column">{sex}</td>
      <td className="column">{born}</td>
      <td className="column">{died}</td>
      <td className="column">{mother?.name}</td>
      <td className="column">{father?.name}</td>
    </tr>
  );
};

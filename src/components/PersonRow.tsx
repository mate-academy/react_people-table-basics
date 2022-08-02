import React from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map(({
        name, sex, born, died, motherName, fatherName, slug,
      }) => (
        <tr key={slug}>
          <td>{name}</td>
          <td>{sex}</td>
          <td>{born}</td>
          <td>{died}</td>
          <td>{motherName}</td>
          <td>{fatherName}</td>
        </tr>
      ))}
    </>
  );
};

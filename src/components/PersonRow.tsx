import React from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map(({
        name, sex, born, died, mother, father,
      }) => (
        <tr key={name}>
          <td>{name}</td>
          <td>{sex}</td>
          <td>{born}</td>
          <td>{died}</td>
          <td>{mother}</td>
          <td>{father}</td>
        </tr>
      ))}
    </>
  );
};

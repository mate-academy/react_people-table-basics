import React from 'react';
import { Person } from '../../types/Person';

type Props = {
  people: Person[];
};

export const PersonRow: React.FC<Props> = ({ people }) => {
  return (
    <>
      {people.map(person => (
        <tr key={person.name}>
          <td>
            {person.name}
          </td>
          <td>
            {person.sex}
          </td>
          <td>
            {person.born}
          </td>
          <td>
            {person.died}
          </td>
          <td>
            {person.motherName}
          </td>
          <td>
            {person.fatherName}
          </td>
        </tr>
      ))}
    </>
  );
};

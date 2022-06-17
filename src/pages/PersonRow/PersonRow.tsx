import React from 'react';
import { Peoples } from '../../types/Peoples';

type Props = {
  people: Peoples[];
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

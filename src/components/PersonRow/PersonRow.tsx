import React from 'react';
import { Person } from '../../types/Person';
import './PersonRow.scss';

interface Props {
  person: Person;
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <>
      <tr>
        <td className="PersonRow__cell">
          {person.name}
        </td>
        <td className="PersonRow__cell">
          {person.sex}
        </td>
        <td className="PersonRow__cell">
          {person.born}
        </td>
        <td className="PersonRow__cell">
          {person.died}
        </td>
        <td className="PersonRow__cell">
          {person.motherName}
        </td>
        <td className="PersonRow__cell">
          {person.fatherName}
        </td>
      </tr>
    </>
  );
};

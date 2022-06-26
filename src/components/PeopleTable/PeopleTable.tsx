import React from 'react';
import { PersonRow } from '../PersonRow/PersonRow';
import './PeopleTable.scss';

type Props = {
  people: Person[] | null;
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table is-bordered">
      <thead>
        <tr>
          <td>Name</td>
          <td>Sex</td>
          <td>Born</td>
          <td>Died</td>
          <td>Father</td>
          <td>Mather</td>
        </tr>
      </thead>
      <tbody>
        {people?.map(person => (
          <PersonRow person={person} />
        ))}
      </tbody>
    </table>
  );
};

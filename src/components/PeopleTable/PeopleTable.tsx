import React from 'react';
import { Person } from '../../types/Person';
import './PeopleTable.scss';
import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[],
}
export const PeopleTable:React.FC<Props> = React.memo(({ people }) => {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>name</th>
            <th>sex</th>
            <th>born</th>
            <th>died</th>
            <th>mother</th>
            <th>father</th>
          </tr>
        </thead>
        <tbody>
          {people.map(person => (
            <PersonRow person={person} />
          ))}
        </tbody>
      </table>

    </>
  );
});

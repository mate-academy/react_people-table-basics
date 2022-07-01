import React from 'react';
import { PersonRow } from '../PersonRow';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => (
  <>
    <h1>People Table</h1>
    <table className="PeopleTable">
      <th>Name</th>
      <th>Sex</th>
      <th>born</th>
      <th>Died</th>
      <th>Mother</th>
      <th>Father</th>
      <tbody>
        {people.map(person => (
          <tr key={person.slug}>
            <PersonRow
              person={person}
            />
          </tr>

        ))}

      </tbody>
    </table>
  </>
);

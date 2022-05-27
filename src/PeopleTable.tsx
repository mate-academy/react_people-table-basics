import React from 'react';
// import { Person } from './react-app-env';
import { PersonRow } from './PersonRow';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <>
      <h1>People table</h1>
      <table
        className="peopleTable"
        // style={{ borderCollapse: 'collapse' }}
      >
        <tbody>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Born</th>
            <th>Died</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </tbody>
        {people.map(person => (
          <PersonRow
            key={person.name}
            person={person}
          />
        ))}
      </table>
    </>
  );
};

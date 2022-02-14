import React from 'react';
import { Person } from './Person';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {Object.keys(people[0]).map(key => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <Person person={person} />
        ))}
      </tbody>
    </table>
  );
};

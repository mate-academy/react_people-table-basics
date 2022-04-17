import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { PersonRow } from './PersonRow';

export const PeopleTable: React.FC = () => {
  const [peopleList, setPeopleList] = useState<People[]>([]);

  useEffect(() => {
    getPeople()
      .then(people => setPeopleList(people));
  }, []);

  return (
    <table
      className="table"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleList.map(person => (
          <PersonRow
            key={person.name}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};

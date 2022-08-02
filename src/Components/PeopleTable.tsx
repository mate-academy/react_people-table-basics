import React, { useEffect, useState } from 'react';
import { getPeople } from '../api/api';
import { Person } from '../Types/Person';
import { PersonRow } from './PersonRow';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[] | null>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div className="container">
      <table className="table is-hoverable is-fullwidth">
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
          {people?.map(person => (
            <PersonRow person={person} key={person.slug} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

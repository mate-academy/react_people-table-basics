import { useEffect, useState } from 'react';
import { getPeople } from '../api/people';
import { Person } from '../types/Person';
import { PersonRow } from './PersonRow';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(allPeople => setPeople(allPeople));
  }, []);

  return (
    <table className="table">
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
        {people.map(person => {
          const mother = people
            .find(mom => mom.name === person.motherName) || null;
          const father = people
            .find(dad => dad.name === person.fatherName) || null;

          return (
            <PersonRow
              key={person.slug}
              person={person}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};

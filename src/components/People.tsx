import React, { useCallback } from 'react';
import { Person } from '../types/Person';
import { PersonRow } from './PersonRow';

interface Props {
  people: Person[],
}

export const People: React.FC<Props> = ({
  people,
}) => {
  const findPerson = useCallback((name: string | null) => {
    if (!name) {
      return undefined;
    }

    return people.find(personItem => {
      return personItem.name === name;
    });
  }, [people]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
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
        {people.map(person => (
          <PersonRow
            person={person}
            key={person.slug}
            findPerson={findPerson}
          />
        ))}
      </tbody>
    </table>
  );
};

import React from 'react';
import { Person } from '../../types/Person';
import { PersonItem } from '../PersonItem/PersonItem';

interface Props {
  people: Person[],
}

export const People: React.FC<Props> = ({
  people,
}) => {
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

      {people.map(person => (
        <PersonItem
          person={person}
          people={people}
          key={person.slug}
        />
      ))}
    </table>
  );
};

import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonComponent } from './PersonComponent';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = memo(({ people }) => {
  const { personSlug } = useParams();

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
          <PersonComponent
            key={person.slug}
            person={person}
            people={people}
            isSelected={personSlug === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
});

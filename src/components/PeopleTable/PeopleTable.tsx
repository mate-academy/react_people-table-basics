import React, { memo } from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';

type Props = {
  people: Person[],
  personSlug: string,
};

export const PeopleTable: React.FC<Props> = memo(({
  people,
  personSlug,
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

      <tbody>
        {people.map(person => {
          const mother = people.find(mom => mom.name === person.motherName);
          const father = people.find(dad => dad.name === person.fatherName);

          return (
            <PersonItem
              person={person}
              key={person.slug}
              personSlug={personSlug}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
});

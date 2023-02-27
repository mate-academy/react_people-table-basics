import React from 'react';
import { Person } from '../../types';
import { PersonString } from '../PersonString';

interface Props {
  people: Person[],
  personSlug: string,
  hasError: boolean,
}

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  personSlug,
  hasError,
}) => {
  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (!people.length) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

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
          <PersonString
            key={person.slug}
            person={person}
            personSlug={personSlug}
          />
        ))}
      </tbody>
    </table>
  );
});

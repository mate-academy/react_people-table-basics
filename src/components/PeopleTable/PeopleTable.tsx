import React from 'react';
import { Person } from '../../types';
import { PersonPage } from '../PersonPage/PersonPage';

type Props = {
  people: Person[],
  selectedSlug: string,
  error: boolean,
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  error,
}) => {
  if (error) {
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
          <PersonPage
            key={person.name}
            person={person}
            selectedPerson={selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};

import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[],
  loading: boolean,
};

export const PeopleTable: React.FC<Props> = ({ people, loading }) => {
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
        {
          people.length > 0
          && (people.map(person => (
            <PersonLink
              key={person.slug}
              person={person}
              people={people}
            />
          )))
        }

        {people.length === 0 && !loading && (
          <tr data-cy="noPeopleMessage">
            <td>There are no people on the server</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

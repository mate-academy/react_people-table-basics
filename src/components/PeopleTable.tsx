import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  loading: boolean;
  hasError: boolean;
};

export const PeopleTable: React.FC<Props> = ({ people, loading, hasError }) => {
  return (
    <div className="block">
      <div className="box table-container">
        {!people.length && !loading && !hasError && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loading && hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {loading && <Loader />}

        {!loading && !!people.length && (
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
                <PersonLink key={person.slug} people={people} person={person} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

import React from 'react';

import { Person } from '../types';
import { Loader } from './Loader';
import { PersonItem } from '../components/PersonItem';

type Props = {
  people: Person[];
  isError: boolean;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isError,
  isLoading,
}) => {
  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && !isLoading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isError && !isLoading && !people.length && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isError && !isLoading && people.length > 0 && (
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
              {people.map((person) => (
                <PersonItem key={person.slug} person={person} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

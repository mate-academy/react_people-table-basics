/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonInfo } from '../PersonInfo';

interface Props {
  people: Person[];
  isLoading: boolean;
  error: string | null;
}

export const PeopleTable: React.FC<Props> = ({ people, isLoading, error }) => {
  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && (
          <>
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
            )}

            {!people.length && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

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
                  <PersonInfo person={person} />
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  errorMessage: string;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  errorMessage,
  isLoading,
}) => {
  return (
    <>
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !errorMessage && people.length > 0 && (
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
                <PersonLink key={person.slug} person={person} people={people} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

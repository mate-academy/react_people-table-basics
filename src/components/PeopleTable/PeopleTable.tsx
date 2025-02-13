import React from 'react';
import { Loader } from '../../components/Loader';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  isLoading,
  errorMessage,
}) => {
  function getParentForSlug(value: string): Person | undefined {
    return people.find(person => person.name === value);
  }

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {people.length === 0 && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && !errorMessage && (
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
                <PersonLink
                  key={person.slug}
                  person={person}
                  getParentForSlug={getParentForSlug}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

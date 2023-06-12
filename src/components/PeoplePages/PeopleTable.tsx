import { FC } from 'react';

import { PersonalLink } from './PersonalLink';
import { Person } from '../../types';

interface PropsPeopleTable {
  people: Person[];
  isLoading: boolean;
  error: boolean;
}

export const PeopleTable: FC<PropsPeopleTable> = ({
  people, isLoading, error,
}) => {
  return (
    <>

      {error
        && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      {people.length < 1 && !isLoading ? (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )
        : (
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
                <PersonalLink
                  person={person}
                  key={person.slug}
                />
              ))}
            </tbody>
          </table>
        )}

    </>
  );
};

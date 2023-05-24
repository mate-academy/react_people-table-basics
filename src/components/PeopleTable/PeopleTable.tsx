import { FC } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { TablePerson } from '../TablePerson';

interface Props {
  people: Person[];
  error: string | null;
  isLoading: boolean;
}

export const PeopleTable: FC<Props> = ({
  people,
  error,
  isLoading,
}) => {
  const tableShouldBeShown = !isLoading && !error && people.length > 0;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && (<Loader />)}

        {error && !isLoading && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        )}

        {!people.length && !isLoading && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {tableShouldBeShown && (
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
                <TablePerson
                  key={person.slug}
                  person={person}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

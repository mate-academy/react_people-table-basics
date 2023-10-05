import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PersonRow } from './PersonRow';

export const PeopleTable:React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then((response) => setPeople(response))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!isLoading && !hasError && people.length === 0 && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        ) }

        {people.length > 0 && (
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
              {people.map((person:Person) => (
                <PersonRow
                  person={person}
                  people={people}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

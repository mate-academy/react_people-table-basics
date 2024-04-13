import { FC, useEffect, useState } from 'react';
import { getPeople } from '../api';
import type { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';

export const PeopleList: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const showTable = !isLoading && !isError;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(people => {
        setPeople(people);
      })
      .catch(() => {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {!people.length && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {showTable && (
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
    </div>
  );
};

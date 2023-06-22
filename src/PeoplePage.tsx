import React, { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { Loader } from './components/Loader';
import { PersonLink } from './PersonLink';

export const PeoplePage: React.FC<{}> = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPeople = async () => {
      try {
        setPeople(await getPeople());
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}

      {error
        && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

      {(!error && !isLoading)
        && (
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
                <PersonLink person={person} people={people} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};

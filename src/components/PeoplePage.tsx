import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      setPeople([]);
      setHasError(false);
    };
  }, []);

  return (
    <div className="container">
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && people.length === 0 && !hasError && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length > 0 && !hasError && (
            <>
              <h1 className="title">People Page</h1>

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
                      person={person}
                      key={person.name}
                      people={people}
                    />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasWarming, setHasWarming] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(peopleFromServer => {
        if (!!peopleFromServer.length) {
          setPeople(peopleFromServer);
        } else {
          setHasWarming(true);
        }
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  function getParent(name: string | null): Person | undefined {
    return people.find(p => p.name === name);
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasWarming && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !hasError && !hasWarming && (
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
                {people.map(person => {
                  const mother = getParent(person.motherName);
                  const father = getParent(person.fatherName);

                  return (
                    <PersonLink
                      key={person.slug}
                      person={{
                        ...person,
                        mother,
                        father,
                      }}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

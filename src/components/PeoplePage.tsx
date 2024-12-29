import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { NotFoundPage } from './NotFoundPage';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(response => setPeople(response))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const findParent = (parentName: string) => {
    return people.find(person => person.name === parentName);
  };

  const namesFromServer = people.map(person => person.name);

  return (
    <>
      <h1 className="title">People Page</h1>
      {error && <NotFoundPage />}

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!loading && !error && people.length > 0 && (
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
                    key={person.name}
                    person={person}
                    names={namesFromServer}
                    findParent={findParent}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

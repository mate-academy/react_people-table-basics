import React, { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { PersonLink } from './Person';
import { getPeople } from '../api';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getPeoples = async () => {
    try {
      const loadePeople = await getPeople();

      setPeople(() => loadePeople);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoaded = !isLoading && people.length;

  useEffect(() => {
    getPeoples();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isLoaded && (
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
                {people?.map(element => (
                  <PersonLink
                    person={element}
                    people={people}
                  />
                ))}
              </tbody>
            </table>
          )}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!isLoaded && people.length)
            ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )
            : ''}
        </div>
      </div>
    </>
  );
};

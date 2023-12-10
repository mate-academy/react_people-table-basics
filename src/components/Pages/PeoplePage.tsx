import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then((response) => {
        setPeople(response);
      }).catch(() => {
        setError(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {people === null && !error && (<Loader />)}
          {people?.length === 0 && !error && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {people && people.length > 0 && !error && (
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
                {people.map((person) => (
                  <PersonLink
                    person={person}
                    people={people}
                    key={person.slug}
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

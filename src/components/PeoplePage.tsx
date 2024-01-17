import { useEffect, useState } from 'react';
import { Loader } from './Loader/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PeoplePage = () => {
  const [isLoader, setIsLoader] = useState(false);
  const [people, setPeople] = useState<Person[]>();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoader(true);
    getPeople()
      .then(setPeople)
      .catch((error) => {
        setIsError(true);
        throw error;
      })
      .finally(() => {
        setIsLoader(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoader && (<Loader />)}

          {people?.length === 0 && !isLoader && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people?.length !== 0 && !isLoader && (
            <table
              data-cy="peopleTable"
              className="
              table
              is-striped
              is-hoverable
              is-narrow
              is-fullwidth"
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
                {people?.map(person => (
                  <PersonLink
                    key={person.name}
                    person={person}
                    people={people}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

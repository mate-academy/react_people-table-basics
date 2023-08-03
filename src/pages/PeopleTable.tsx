import { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PersonRow } from './PersonRow';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const preparedPeople = useMemo(() => {
    return getPeopleWithParents(people);
  }, [people]);

  const isLoadWithoutErrors = !isError && !isLoading;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(isLoadWithoutErrors && people.length === 0) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoadWithoutErrors && (
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
                {preparedPeople.map(person => (
                  <PersonRow
                    key={person.slug}
                    person={person}
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

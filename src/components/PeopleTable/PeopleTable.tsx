import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';

export const PeopleTable = () => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isLoaded = !isLoading && !isError;

  const loadPeople = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setAllPeople(peopleFromServer);
    } catch {
      setIsError(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPeople();
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
                {allPeople?.map(person => (
                  <PersonInfo
                    person={person}
                    allPeople={allPeople}
                  />
                ))}
              </tbody>
            </table>
          )}

          {(allPeople.length === 0 && isLoaded) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};

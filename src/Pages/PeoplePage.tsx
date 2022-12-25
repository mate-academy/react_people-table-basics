import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchPeople = useCallback(async () => {
    try {
      const inData = await getPeople();

      setPeople(inData);
    } catch (inError) {
      setIsError(true);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!isLoaded
            ? <Loader />
            : (
              <>
                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                <table
                  data-cy="peopleTable"
                  className="table
                  is-striped is-hoverable is-narrow is-fullwidth"
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
                      <PeopleTable
                        key={person.slug}
                        person={person}
                        people={people}
                      />
                    ))}
                  </tbody>
                </table>
              </>
            )}

        </div>
      </div>
    </>
  );
};

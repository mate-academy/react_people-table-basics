import { useState, useEffect } from 'react';
import { PeopleTable } from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getPeopleFromApi = async () => {
    try {
      setIsLoading(true);
      const peopleFromApi = await getPeople();

      setPeople(peopleFromApi);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromApi();
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

          {people.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!isLoading && people
           && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};

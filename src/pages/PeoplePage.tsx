import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      setIsLoading(true);
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const noPeopleError = !error && !people.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">

          {isLoading && (<Loader />)}

          {error
          && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {noPeopleError
            && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

          {people.length !== 0 && (
            <PeopleTable people={people} />
          )}

        </div>
      </div>

    </>
  );
};

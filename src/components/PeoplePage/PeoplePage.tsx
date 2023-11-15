import { useEffect, useState } from 'react';

import { Person } from '../../types';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTablet } from '../PeopleTablet';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // initial load
  const getPeopleFromServer = async () => {
    try {
      setIsLoading(true);
      const response = await getPeople();

      setPeople(response);
    } catch {
      setError(true);
      setTimeout(() => setError(false), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (<Loader />)}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && people.length < 1 && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && <PeopleTablet people={people} />}
        </div>
      </div>
    </>
  );
};

import { useEffect, useState, useCallback } from 'react';
import { Loader } from '../components/Loader';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import PeopleTable from '../components/PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPeople = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPeople();

      setPeople(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
      setPeople([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, [fetchPeople]);

  const handleRetry = useCallback(() => {
    fetchPeople();
  }, [fetchPeople]);

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && error && (
            <div className="notification is-danger">
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {error}
              </p>
              <button
                className="button is-small is-outlined is-danger mt-2"
                onClick={handleRetry}
                type="button"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && people.length === 0 && (
            <div className="notification is-info">
              <p data-cy="noPeopleMessage">There are no people on the server</p>
              <button
                className="button is-small is-outlined is-info mt-2"
                onClick={handleRetry}
                type="button"
              >
                Refresh
              </button>
            </div>
          )}

          {!isLoading && !error && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;

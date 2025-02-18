import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !error && people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};

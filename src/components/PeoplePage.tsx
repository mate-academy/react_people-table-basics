import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(() => setError('Unable to load people'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}
      {!isLoading && !error && people && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!isLoading && !error && people && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </div>
  );
};

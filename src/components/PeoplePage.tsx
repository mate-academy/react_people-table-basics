import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types/Person';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
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

  const noPeople = !isLoading && !error && people && people.length === 0;
  const hasPeople = !isLoading && !error && people && people.length > 0;

  return (
    <div>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {error}
        </p>
      )}
      {noPeople && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {hasPeople && <PeopleTable people={people} />}
    </div>
  );
};

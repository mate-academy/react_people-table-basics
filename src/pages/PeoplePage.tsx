import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {error && <p data-cy="peopleLoadingError">Something went wrong</p>}
      {!isLoading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!isLoading && !error && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};

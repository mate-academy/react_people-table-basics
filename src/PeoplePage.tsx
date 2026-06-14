import { getPeople } from './api';
import { Person } from './types';
import { useEffect, useState } from 'react';
import { PeopleTable } from './PeopleTable';
import { Loader } from './components/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {error && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {isLoading && <Loader />}
      {!isLoading && !error && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      <h1 className="title">People Page</h1>
      {people.length > 0 && <PeopleTable people={people} />}
    </>
  );
};

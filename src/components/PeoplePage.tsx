import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}
        {error ? (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {error}
          </p>
        ) : people.length > 0 ? (
          <PeopleTable people={people} />
        ) : !isLoading ? (
          <p data-cy="noPeopleMessage">There are no people on server</p>
        ) : null}
      </div>
    </main>
  );
};

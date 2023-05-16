import { useEffect, useState } from 'react';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = await getPeople();

        setHasError(false);
        setPeople(data);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        {isLoading && (
          <Loader />
        )}

        {(!people.length && !isLoading) && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        <div className="block">
          <div className="box table-container">
            {(!isLoading && !hasError) && (
              <PeopleTable people={people} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

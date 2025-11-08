import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setError(null);

    getPeople()
      .then(data => {
        if (isCancelled) {
          return;
        }

        setPeople(data);
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setError('Something went wrong');
      })
      .finally(() => {
        if (isCancelled) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const noPeople = !isLoading && !error && people.length === 0;
  const hasPeople = !isLoading && !error && people.length > 0;

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <div data-cy="loader">
              <Loader />
            </div>
          )}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {noPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {hasPeople && <PeopleTable people={people} />}

        </div>
      </div>
    </div>
  );
};

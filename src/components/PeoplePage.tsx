import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingError, setIsLoadingError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching people data:', error);
        setIsLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div data-cy="peoplePage">
      <h1 className="title">People Page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {isLoadingError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : (
            <div>
              {people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable people={people} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

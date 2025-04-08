import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';
import { Loader } from '../Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingError(false);
    setTimeout(() => {
      fetch('/api/people.json')
        .then(resp => {
          if (!resp.ok) {
            throw new Error('SomethingWent Wrong');
          }

          return resp.json();
        })
        .then(data => {
          setPeople(data);
          setIsLoadingError(false);
        })
        .catch(() => setIsLoadingError(true))
        .finally(() => setIsLoading(false));
    }, 1000);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && isLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !isLoadingError && people?.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!isLoading && !isLoadingError && people?.length !== 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

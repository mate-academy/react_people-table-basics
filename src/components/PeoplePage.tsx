import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const everythingOk = !isError && !isLoading && people.length > 0;
  const isEmpty = !isError && !isLoading && people.length === 0;

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ))}
          {isEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}
          {everythingOk && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </div>
  );
};

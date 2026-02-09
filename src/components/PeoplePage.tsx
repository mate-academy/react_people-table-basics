import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const showEmptyMessage = !isLoading && !isError && people.length === 0;
  const showTable = !isLoading && !isError && people.length > 0;
  const showErrorMessage = !isLoading && isError;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {showErrorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {showEmptyMessage && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {showTable && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};

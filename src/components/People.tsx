import { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { Table } from './PeopleTable/PeopleTable';

export const People = () => {
  const [people, setPeople] = useState<Person []>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch('https://mate-academy.github.io/react_people-table/api/people.json')
      .then(response => response.json())
      .then(data => {
        setPeople(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !error && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!error && !isLoading && (
            <Table people={people} />
          )}
        </div>
      </div>

    </>
  );
};

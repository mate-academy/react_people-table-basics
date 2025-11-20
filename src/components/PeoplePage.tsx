import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(result => {
        setPeople(result);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading && <Loader />}
      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}
      {!isLoading && !isError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}
      {!isLoading && !isError && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};

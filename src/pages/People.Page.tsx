import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {people.length === 0 && !isLoading && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !hasError && people.length > 0 && (
        <PeopleTable people={people} />
      )}
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { normalizePeople } from '../utils/normalizePeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(peopleFromServer => {
        setPeople(normalizePeople(peopleFromServer));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading || isError) {
    return (
      <>
        <h1 className="title">People Page</h1>

        {isLoading && <Loader />}

        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      {people.length ? (
        <PeopleTable people={people} />
      ) : (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}
    </>
  );
};

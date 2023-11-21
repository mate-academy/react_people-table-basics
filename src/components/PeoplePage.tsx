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

  if (isLoading) {
    return (
      <>
        <h1 className="title">People Page</h1>
        <Loader />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      </>
    );
  }

  if (people.length === 0) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <PeopleTable people={people} />
    </>
  );
};

import React, { useState, useEffect } from 'react';

import { getPeople } from '../../api';

import { Loader } from '../Loader';
import { PeopleTable } from '../PersonLink';

import { Person } from '../../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {people.length === 0 && !isLoading && !hasError && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {people.length > 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';

import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getPeopleFromServer = async () => {
    try {
      const peopleList = await getPeople();

      setPeople(peopleList);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoaded(true);
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
          {!isLoaded && (
            <Loader />
          )}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoaded && !isError && !people.length && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isLoaded && !isError && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

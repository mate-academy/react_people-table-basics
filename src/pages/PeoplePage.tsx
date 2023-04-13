import React, { useCallback, useEffect, useState } from 'react';

import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPeopleFromServer = useCallback(async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="box table-container">
          {!isLoaded && (
            <Loader />
          )}

          {isLoaded && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoaded && !errorMessage && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

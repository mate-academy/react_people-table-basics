import React, { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { preparePeople } from '../helpers/preparePeople';
import { Person } from '../types';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

interface LoadingState {
  isLoading: boolean,
  isError: boolean,
}

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    isError: false,
  });

  const { isLoading, isError } = loadingState;

  useEffect(() => {
    setLoadingState({ isLoading: true, isError: false });
    getPeople()
      .then(peopleFromServer => setPeople(preparePeople(peopleFromServer)))
      .catch(() => setLoadingState(prev => ({ ...prev, isError: true })))
      .finally(() => setLoadingState(prev => ({ ...prev, isLoading: false })));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {(isError && !isLoading) && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {(!people.length && !isLoading) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {(!!people.length && !isLoading) && (
            <PeopleTable
              people={people}
            />
          )}
        </div>
      </div>
    </>
  );
};

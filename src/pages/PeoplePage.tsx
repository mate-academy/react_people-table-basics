import { useEffect, useState } from 'react';
import * as peopleService from '../api';

import { Loader, PeopleTable } from '../components';
import { Person } from '../types';
import { findParents } from '../utils/findParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPeople = () => {
    peopleService
      .getPeople()
      .then(res => {
        const peopleWithParents = findParents(res);

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  };

  useEffect(loadPeople, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {!isLoading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !errorMessage && people.length !== 0 && (
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

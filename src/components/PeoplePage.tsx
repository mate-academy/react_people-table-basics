import { useEffect, useState } from 'react';

import { Person } from '../types';
import { PeopleList } from './PeopleList';
import { getPreparedPeople } from '../utils/PeopleUtils';
import { Loader } from './Loader';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(currentPeople => {
        setPeople(getPreparedPeople(currentPeople));
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isDisplayErrorMessage = isError && !isLoading;

  const isNoPeopleOnServer = !people.length && !isLoading && !isError;

  const isPeopleOnServer = !!people.length && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isDisplayErrorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {isPeopleOnServer && (
            <PeopleList people={people} />
          )}
        </div>
      </div>
    </>
  );
};

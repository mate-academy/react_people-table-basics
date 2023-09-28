import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleList } from '../PeopleList/PeopleList';
import { getPreparedPeople } from '../../utils/PeopleUtils';

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

  const isDisplayErrorMessage = useMemo(() => {
    return isError && !isLoading;
  }, [isError, isLoading]);

  const isNoPeopleOnServer = useMemo(() => {
    return !people.length && !isLoading && !isError;
  }, [isError, isLoading, people]);

  const isPeopleOnServer = useMemo(() => {
    return !!people.length && !isError;
  }, [isError, isLoading, people]);

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

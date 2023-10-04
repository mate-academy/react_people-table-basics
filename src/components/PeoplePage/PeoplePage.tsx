import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPreparedPeople } from '../../utils/preparedPeople';

export const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const isDisplayErrorMessage = isError && !isLoading;
  const isNoPeopleOnServer = !people.length && !isLoading && !isError;
  const isPeopleOnServer = !!people.length && !isError;

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    (async () => {
      try {
        const peopleFrom = await getPeople();
        const preparedPeople = getPreparedPeople(peopleFrom);

        setPeople(preparedPeople);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

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
            <PeopleTable people={people} />
          )}
        </div>
      </div>
    </>
  );
};

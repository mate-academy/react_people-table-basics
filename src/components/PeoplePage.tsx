import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(getPreparedPeople(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isDisplayErrorMessage = isError && !isLoading;
  const isNoPeopleOnServer = !people.length && !isLoading && !isError;
  const isPeopleOnServer = !!people.length && !isError;

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

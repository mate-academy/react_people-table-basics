import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PersonType } from '../types';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isPeopleLoadingError = !isLoading && isError;
  const hasNoPeopleFromServer = !isLoading && !isError && !people.length;
  const hasPeopleToShow = !isLoading && !isError && !!people.length;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => (
        setPeople(getPreparedPeople(peopleFromServer))
      ))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isPeopleLoadingError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {hasNoPeopleFromServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {hasPeopleToShow && (
            <PeopleTable people={people} />
          )}

        </div>
      </div>
    </>
  );
};

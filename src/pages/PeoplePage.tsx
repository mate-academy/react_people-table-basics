import { useEffect, useState } from 'react';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { getParents } from '../utills/getParentsFuncts';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => (
        setPeople(getParents(peopleFromServer))
      ))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isNoPeople = !people.length && !isLoading && !isError;
  const isErrorMessage = isError && !isLoading;
  const isDisplayPeople = !!people.length && !isError;

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && (
        <Loader />
      )}

      {isErrorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {isNoPeople && (
        <p data-cy="noPeopleMessage">
          There are no people on the server
        </p>
      )}

      {isDisplayPeople && (
        <PeopleTable people={people} />
      )}
    </>
  );
};

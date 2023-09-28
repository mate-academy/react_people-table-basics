import { useEffect, useState } from 'react';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { ErrorMessage } from '../types/ErrorMessage';
import { PeopleTable } from '../components/PeopleTable';
import { addParentsToPeople } from '../services';

export const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(ErrorMessage.Default);
  const [isLoading, setIsLoading] = useState(false);

  const isErrorMessageDisplayed = !isLoading && errorMessage;
  const isTableDisplayed = !isLoading && !errorMessage && people.length;
  const isNoPeopleOnServer = !isLoading && !errorMessage && !people.length;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => (
        setPeople(addParentsToPeople(peopleFromServer))
      ))
      .catch(() => setErrorMessage(ErrorMessage.WentWrong))
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

          {isErrorMessageDisplayed && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}

          {isTableDisplayed && (
            <PeopleTable people={people} />
          )}

          {isNoPeopleOnServer && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

        </div>
      </div>
    </>
  );
};

import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = getPreparedPeople(peopleFromServer);

        setPeople(preparedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!hasError && !isLoading && <PeopleTable people={people} />}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
        </div>
      </div>
    </>
  );
};

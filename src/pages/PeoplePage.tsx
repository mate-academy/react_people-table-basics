import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = getPreparedPeople(people);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {!isLoading && error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && !error && !people.length && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !error && !!people.length && (
            <PeopleTable people={preparedPeople} />
          )}
        </div>
      </div>
    </>
  );
};

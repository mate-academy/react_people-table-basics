import { useState, useEffect } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Loader } from '../components/Loader/Loader';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isTableVisible = !isError && !isLoading && !!people.length;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const isErrorVisible = isError && !isLoading;
  const isEmptyMessageVisible = !people.length && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isErrorVisible && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {isEmptyMessageVisible && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {isTableVisible && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};

import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [fetchError, setFetchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function loadPeople() {
    setIsLoading(true);

    getPeople()
      .then(people => {
        setPeopleList(people);
        setFetchError(false);
      })
      .catch(() => {
        setFetchError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(loadPeople, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {fetchError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {peopleList.length === 0 && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {peopleList.length > 0 && <PeopleTable people={peopleList} />}
        </div>
      </div>
    </>
  );
};

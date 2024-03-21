import { Loader } from '../components/Loader';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isNoPeople = !peopleList.length && !isLoading && !isError;
  const isVisiblePeople = !!peopleList.length && !isLoading && !isError;

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleList)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isNoPeople && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {isVisiblePeople && <PeopleTable peopleList={peopleList} />}
        </div>
      </div>
    </div>
  );
};

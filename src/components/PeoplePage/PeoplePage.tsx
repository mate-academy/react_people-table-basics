import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const isEmpty = !isLoading && !isError && peopleList.length === 0;

  useEffect(() => {
    getPeople()
      .then(setPeopleList)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}
          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isEmpty && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && peopleList.length > 0 && (
            <PeopleTable people={peopleList} />
          )}
        </div>
      </div>
    </>
  );
};

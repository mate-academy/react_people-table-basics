import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    getPeople()
      .then(response => {
        if (response.length > 0) {
          setPeopleList(response);
        } else {
          setIsEmpty(true);
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {isError && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {isEmpty ? (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          ) : (
            <PeopleTable peopleList={peopleList} />
          )}
        </div>
      </div>
    </>
  );
};

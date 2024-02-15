import { useContext, useEffect } from 'react';
import { PeopleList } from '../PeopleContext';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/peopleTable/PeopleTable';

export const People = () => {
  const {
    peopleList, setPeopleList,
    isLoading, setIsLoading,
    isError, setIsError,
  } = useContext(PeopleList);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeopleList)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {!isLoading && isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!peopleList.length && !isLoading && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!!peopleList.length && !isLoading && (
            <PeopleTable />
          )}
        </div>
      </div>
    </>
  );
};

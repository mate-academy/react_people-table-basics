import { useContext, useEffect } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { PeopleContext } from '../PeopleContext';

export const PeoplePage = () => {
  const {
    peopleList,
    setPeopleList,
    isLoading,
    setIsLoading,
    isVisibleError,
    setIsVisibleError,
  } = useContext(PeopleContext);

  useEffect(() => {
    setIsLoading(true);
    setIsVisibleError(false);

    getPeople()
      .then(setPeopleList)
      .catch(() => setIsVisibleError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && (
            <Loader />
          )}

          {!isLoading && isVisibleError && (
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

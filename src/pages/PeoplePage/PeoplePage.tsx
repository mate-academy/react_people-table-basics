import { useContext, useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { PeopleContext } from '../../store/peopleContext';

export const PeoplePage = () => {
  const { isLoading, getPeopleFromServer, isError, people } =
    useContext(PeopleContext);

  useEffect(() => {
    getPeopleFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : people.length === 0 ? (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ) : (
            <PeopleTable />
          )}
        </div>
      </div>
    </>
  );
};

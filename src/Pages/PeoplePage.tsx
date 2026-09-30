import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { useDispatch, useGlobalState } from '../store/GlobalProvider';

export const PeoplePage = () => {
  const { people } = useGlobalState();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(response => {
        dispatch({ type: 'updatePeople', payload: { people: response } });
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

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

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && !isError && people.length > 0 && <PeopleTable />}
        </div>
      </div>
    </>
  );
};

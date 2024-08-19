import { useContext, useEffect } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { DispatchContext, StatesContext } from '../context/Store';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const { isLoading, errorMessage, people } = useContext(StatesContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
    dispatch({ type: 'startLoading' });
    getPeople()
      .then(peopleFromServer =>
        dispatch({ type: 'loadPeople', payload: peopleFromServer }),
      )
      .catch(() => dispatch({ type: 'setErrorMessage' }))
      .finally(() => {
        dispatch({ type: 'stopLoading' });
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {errorMessage && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {errorMessage}
            </p>
          )}
          {!isLoading && !errorMessage && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!errorMessage && people.length !== 0 && <PeopleTable />}
        </div>
      </div>
    </div>
  );
};

import { useContext } from 'react';
import { Loader } from '../components/Loader';
import { DispatchContext, StateContext } from '../store';
import { PeopleTable } from '../components/People';
import React from 'react';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const dispatch = useContext(DispatchContext);
  const { people, loading, error } = useContext(StateContext);

  React.useEffect(() => {
    dispatch({ type: 'loadStart' });

    getPeople()
      .then(loadPeople => {
        dispatch({ type: 'loadSuccess', payload: loadPeople });
      })
      .catch(() => {
        dispatch({
          type: 'error',
          payload: 'Something went wrong',
        });
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? <Loader /> : <PeopleTable />}

          {error !== null && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          {people.length === 0 && !error && !loading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};

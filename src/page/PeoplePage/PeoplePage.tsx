import { useContext, useEffect } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { getPeople } from '../../api';
import { DispatchContext, StateContext } from '../../store';

export const PeoplePage = () => {
  const { loading, people, error } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  useEffect(() => {
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

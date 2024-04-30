import React from 'react';

import { useLocation } from 'react-router-dom';

import { usePeopleDispatch, usePeopleState } from '../store/PeopleContext';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';

import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const location = useLocation();

  const { people, error, loading } = usePeopleState();
  const dispatch = usePeopleDispatch();

  React.useEffect(() => {
    const currentPath = location.pathname;
    const basePeoplePath = '/people';

    if (currentPath.startsWith(basePeoplePath)) {
      dispatch({
        type: 'SET_ERROR',
        payload: '',
      });
      dispatch({
        type: 'SET_LOADING',
        payload: true,
      });
      getPeople()
        // eslint-disable-next-line
        .then(people => {
          dispatch({
            type: 'SET_PEOPLE',
            payload: people,
          });
          dispatch({
            type: 'SET_LOADING',
            payload: false,
          });
        })
        .catch(() => {
          dispatch({
            type: 'SET_ERROR',
            payload: 'Something went wrong',
          });
        });
    }
  }, [dispatch]);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="block box has-text-danger">
        {error}
      </p>
    );
  }

  if (!people.length && !loading) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading ? <Loader /> : <PeopleTable />}
        </div>
      </div>
    </>
  );
};

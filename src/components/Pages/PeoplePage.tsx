import React, { useEffect, useReducer } from 'react';
import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../People/PeopleTable';

type State = {
  loading: boolean;
  errors: string | null;
  people: Person[];
};

enum ActionType {
  FETCH_START = 'FETCH_START',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
}

type Action =
  | { type: ActionType.FETCH_START }
  | { type: ActionType.FETCH_SUCCESS; payload: Person[] }
  | { type: ActionType.FETCH_ERROR; payload: string };

const initialState: State = {
  loading: true,
  errors: null,
  people: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.FETCH_START:
      return { ...state, loading: true, errors: null };
    case ActionType.FETCH_SUCCESS:
      return { loading: false, errors: null, people: action.payload };
    case ActionType.FETCH_ERROR:
      return { loading: false, errors: action.payload, people: [] };
    default:
      return state;
  }
}

function getContent(state: State) {
  if (state.loading) {
    return null;
  }

  if (state.errors) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (state.people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return <PeopleTable people={state.people} />;
}

export const PeoplePage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchPeople = async () => {
      dispatch({ type: ActionType.FETCH_START });
      try {
        const people = await getPeople();

        dispatch({ type: ActionType.FETCH_SUCCESS, payload: people });
      } catch (error) {
        dispatch({
          type: ActionType.FETCH_ERROR,
          payload:
            error instanceof Error
              ? error.message
              : 'Cannot get people from server',
        });
      }
    };

    void fetchPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {state.loading ? <Loader /> : getContent(state)}
        </div>
      </div>
    </>
  );
};

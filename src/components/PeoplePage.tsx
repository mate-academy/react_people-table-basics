import { useEffect, useReducer } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: React.FC = () => {
  const initialState = {
    people: [],
    isLoading: true,
    error: null,
  };

  interface State {
    people: Person[];
    isLoading: boolean;
    error: Error | null;
  }

  type Action =
    | { type: 'FETCH_PEOPLE_SUCCESS'; payload: Person[] }
    | { type: 'FETCH_PEOPLE_ERROR'; payload: Error };

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'FETCH_PEOPLE_SUCCESS':
        return {
          ...state,
          people: action.payload,
          isLoading: false,
        };

      case 'FETCH_PEOPLE_ERROR':
        return {
          ...state,
          error: action.payload,
          isLoading: false,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getPeople()
      .then(people => {
        dispatch({ type: 'FETCH_PEOPLE_SUCCESS', payload: people });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_PEOPLE_ERROR', payload: error });
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {state.isLoading && <Loader />}

          {state.error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}
          {!state.isLoading &&
            !state.error &&
            (state.people.length === 0 ? (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            ) : (
              <PeopleTable people={state.people} />
            ))}
        </div>
      </div>
    </>
  );
};

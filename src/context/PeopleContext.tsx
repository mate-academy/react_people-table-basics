import React, {
  ReactNode, createContext, useEffect, useReducer,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleAction } from './PeopleActions';
import { ErrorType } from '../types/ErrorType';

interface PeopleState {
  people: Person[];
  selectedPerson: Person | null;
  isLoading: boolean;
  error: ErrorType | null;
}

interface StateProviderProps {
  children: ReactNode;
}

const initialState: PeopleState = {
  people: [],
  selectedPerson: null,
  isLoading: false,
  error: null,
};

const peopleReducer = (state: PeopleState, action: PeopleAction) => {
  switch (action.type) {
    case 'SET_PEOPLE':
      return { ...state, people: action.payload };
    case 'SELECT_PERSON':
      return {
        ...state,
        selectedPerson: state.people
          .find(p => p.slug === action.payload) ?? null,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const PeopleContext = createContext<{
  state: PeopleState;
  dispatch: React.Dispatch<PeopleAction>
}>(
  { state: initialState, dispatch: () => null },
);

export const PeopleProvider: React.FC<StateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(peopleReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    getPeople()
      .then(fetchedPeople => {
        dispatch({ type: 'SET_PEOPLE', payload: fetchedPeople });

        if (!fetchedPeople.length) {
          dispatch({ type: 'SET_ERROR', payload: ErrorType.EMPTY_ERROR });
        }

        dispatch({ type: 'SET_LOADING', payload: false });
      })
      .catch(() => {
        dispatch({ type: 'SET_ERROR', payload: ErrorType.FETCH_ERROR });
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  }, []);

  const value = { state, dispatch };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

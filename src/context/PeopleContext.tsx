import React, {
  ReactNode, createContext, useEffect, useReducer,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

interface PeopleState {
  people: Person[];
  selectedPerson: Person | null;
  isLoading: boolean;
  error: string | null;
}

type PeopleAction =
  | { type: 'SET_PEOPLE'; payload: Person[] }
  | { type: 'SELECT_PERSON'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SELECT_MOTHER_BY_NAME'; payload: string }
  | { type: 'SELECT_FATHER_BY_NAME'; payload: string };

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
    case 'SELECT_MOTHER_BY_NAME': {
      const mother = state.people.find(p => p.name === action.payload);

      return {
        ...state,
        selectedPerson: mother ?? null,
      };
    }

    case 'SELECT_FATHER_BY_NAME': {
      const father = state.people.find(p => p.name === action.payload);

      return {
        ...state,
        selectedPerson: father ?? null,
      };
    }

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
        dispatch({ type: 'SET_LOADING', payload: false });
      })
      .catch((err) => {
        dispatch({ type: 'SET_ERROR', payload: `Failed to fetch people, ${err}` });
        dispatch({ type: 'SET_LOADING', payload: false });
      });
  }, []);

  const value = { state, dispatch };

  // console.log(state);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

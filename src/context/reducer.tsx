/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer } from 'react';
import { Person } from '../types';
import { SwithchError } from '../types/switchError';

type Action =
  | { type: 'setPeople'; payload: Person[] }
  | { type: 'setFetch' }
  | { type: 'disableFetch' }
  | { type: 'setSwitchError'; message: SwithchError };

interface State {
  people: Person[];
  isLoading: boolean;
  message: SwithchError;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setPeople':
      return {
        ...state,
        people: action.payload,
      };

    case 'setFetch':
      return {
        ...state,
        isLoading: true,
      };

    case 'disableFetch':
      return {
        ...state,
        isLoading: false,
      };

    case 'setSwitchError':
      return {
        ...state,
        message: action.message,
      };
  }
};

const initialState: State = {
  people: [],
  isLoading: false,
  message: SwithchError.Default,
};

export const StateContex = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => {});

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContex.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContex.Provider>
  );
};

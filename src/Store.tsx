import React, { useReducer } from 'react';
import { Person } from './types/Person';

export enum Actions {
  getPeople = 'getPeople',
  setErrorMessage = 'setErrorMessage',
}

type Action =
  | { type: Actions.getPeople; people: Person[] }
  | { type: Actions.setErrorMessage; errorMessage: string };

interface State {
  people: Person[];
  errorMessage: string;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case Actions.getPeople:
      return {
        ...state,
        people: action.people,
      };
    case Actions.setErrorMessage:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}

const initialState: State = {
  people: [],
  errorMessage: '',
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [{ people, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{ people, errorMessage }}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

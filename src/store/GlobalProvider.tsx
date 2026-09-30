import React from 'react';
import { Person } from '../types';

type State = {
  people: Person[];
};

export const initialState: State = {
  people: [],
};

type Action = { type: 'updatePeople'; payload: { people: Person[] } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'updatePeople':
      return { ...state, people: action.payload.people };
  }
};

const StateContext = React.createContext<State>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => React.useContext(DispatchContext);
export const useGlobalState = () => React.useContext(StateContext);

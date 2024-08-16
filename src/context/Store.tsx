import { createContext, useReducer, useState } from 'react';
import { Person } from '../types';
import { States } from '../types/States';

type DispatchContextType = {
  (action: Action): void;
};

type Action =
  | { type: 'loadPeople'; payload: Person[] }
  | { type: 'startUpdate'; payload: boolean }
  | { type: 'stopUpdate'; payload: boolean };

const initialStates: States = {
  people: [],
  isLoading: false,
};

function reducer(states: States, action: Action) {
  let newStates: States = { ...states };

  switch (action.type) {
    case 'loadPeople':
      newStates = { ...newStates, people: action.payload };
      break;
    case 'startUpdate':
      newStates = { ...newStates, isLoading: action.payload };
      break;
    case 'stopUpdate':
      newStates = { ...newStates, isLoading: action.payload };
      break;
    default:
      return states;
  }

  return newStates;
}

export const StatesContext = createContext(initialStates);
export const DispatchContext = createContext<DispatchContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [states, dispatch] = useReducer(reducer, initialStates);

  return (
    <StatesContext.Provider value={states}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StatesContext.Provider>
  );
};

import { createContext, useReducer } from 'react';
import { Person } from '../types';
import { States } from '../types/States';

type DispatchContextType = {
  (action: Action): void;
};

type Action =
  | { type: 'loadPeople'; payload: Person[] }
  | { type: 'startLoading' }
  | { type: 'stopLoading' }
  | { type: 'setErrorMessage' };

const initialStates: States = {
  people: [],
  isLoading: false,
  errorMessage: '',
};

function reducer(states: States, action: Action) {
  let newStates: States = { ...states };

  switch (action.type) {
    case 'loadPeople':
      newStates = { ...newStates, people: action.payload };
      break;
    case 'startLoading':
      newStates = { ...newStates, isLoading: true };
      break;
    case 'stopLoading':
      newStates = { ...newStates, isLoading: false };
      break;
    case 'setErrorMessage':
      newStates = { ...newStates, errorMessage: 'Something went wrong' };
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

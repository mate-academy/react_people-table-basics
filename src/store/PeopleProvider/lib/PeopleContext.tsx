import { createContext, Dispatch } from 'react';
import { IPeopleActions, IPeopleState } from './types';

interface IPeopleContext {
  state: IPeopleState;
  dispatch: Dispatch<IPeopleActions>;
}

const initialState: IPeopleContext = {
  state: { people: [] },
  dispatch: () => {},
};

export const PeopleContext = createContext<IPeopleContext>(initialState);

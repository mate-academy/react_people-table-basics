import { createContext, Dispatch } from 'react';
import { PeopleActions, PeopleState } from './PeopleStateAndActions';

interface PeopleContextInterface {
  state: PeopleState;
  dispatch: Dispatch<PeopleActions>;
}

const initialState: PeopleContextInterface = {
  state: { people: [] },
  dispatch: () => {},
};

export const PeopleContext =
  createContext<PeopleContextInterface>(initialState);

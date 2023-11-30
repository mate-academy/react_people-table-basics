import { Person } from '../types';

export type PeopleAction =
  | { type: 'SET_PEOPLE'; payload: Person[] }
  | { type: 'SELECT_PERSON'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

export type DispatchFunction = (action: PeopleAction) => void;

export const selectPerson
  = (dispatch: DispatchFunction, slug: string) => {
    dispatch({ type: 'SELECT_PERSON', payload: slug });
  };

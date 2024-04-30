import { Person } from './Person';

export type Action =
  | {
      type: 'SET_PEOPLE';
      payload: Person[];
    }
  | {
      type: 'SET_LOADING';
      payload: boolean;
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    };

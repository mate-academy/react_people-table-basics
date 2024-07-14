import { Person } from '../../../types';

export interface IPeopleState {
  people: Person[];
}

export type IPeopleActions = { type: 'load'; payload: Person[] };

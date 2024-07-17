import { Person } from '../../types';

export interface PeopleState {
  people: Person[];
}

export type PeopleActions = { type: 'load'; payload: Person[] };

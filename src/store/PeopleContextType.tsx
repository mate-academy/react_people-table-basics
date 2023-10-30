import { Person } from '../types';

export interface PeopleContextType {
  people: Person[];
  loading: boolean;
  errorMessage: string;
}

import { Person } from './Person';

export type PeopleContext = {
  people: Person[] | null;
  isLoading: boolean;
};

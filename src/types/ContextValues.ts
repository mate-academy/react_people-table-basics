import { Person } from './Person';

export type PeopleContextValue = {
  people: Person[];
  isLoading: boolean;
  isError: boolean;
  fetchPeople: () => Promise<void>;
};

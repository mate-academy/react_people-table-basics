import { Person } from './Person';

export type PeopleContextValue = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
  fetchPeople: () => Promise<void>;
};

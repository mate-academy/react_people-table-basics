import { Person } from './Person';

export interface PeopleContextType {
  people: Person[];
  setPeople: (people: Person[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  hasLoadingError: boolean;
  setHasLoadingError: (hasLoadingError: boolean) => void;
}

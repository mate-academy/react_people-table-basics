import { createContext, Dispatch, SetStateAction } from 'react';
import { IPerson } from '../../types';

type PeopleContextType = {
  people: IPerson[];
  setPeople: Dispatch<SetStateAction<IPerson[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
};

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  setPeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  setError: () => {},
  error: false,
});

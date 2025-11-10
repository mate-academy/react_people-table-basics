import { createContext } from 'react';
import { Person } from '../types';

type PeopleContextType = {
  people: Person[];
};

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
});

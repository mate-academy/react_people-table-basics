import {
  Dispatch, createContext, useState, SetStateAction,
} from 'react';
import { PersonTypes } from '../types';

type Props = {
  children: React.ReactNode
};

type PeopleContextType = {
  people: PersonTypes[];
  setPeople: Dispatch<SetStateAction<PersonTypes[]>>;
};

export const PeopleContext
  = createContext<PeopleContextType>({ people: [], setPeople: () => {} });

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<PersonTypes[] | []>([]);

  const value = {
    people,
    setPeople,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

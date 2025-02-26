import { createContext, useState } from 'react';
import { Person } from '../../types';

interface PeopleContextType {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
}

export const PeopleContext = createContext<PeopleContextType | undefined>(
  undefined,
);

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};

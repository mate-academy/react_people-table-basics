import React, { createContext, useState } from 'react';
import { Person } from '../types';
type InitialContext = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
};
export const PeopleContext = createContext<InitialContext>({
  people: [],
  setPeople: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  return (
    <PeopleContext.Provider value={{ people, setPeople }}>
      {children}
    </PeopleContext.Provider>
  );
};

import React, { useMemo, useState } from 'react';
import { Person } from './types/Person';

type PersonContextType = {
  people: Person[];
  setPeople: (people: Person[]) => void;
};

export const PeopleContext = React.createContext<PersonContextType>({
  people: [] as Person[],
  setPeople: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);

  const data = useMemo(() => ({ people, setPeople }), [people, setPeople]);

  return (
    <PeopleContext.Provider value={data}>{children}</PeopleContext.Provider>
  );
};
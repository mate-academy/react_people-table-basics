import React, { useState } from 'react';
import { Person } from '../types';

type Props = {
  children: React.ReactNode;
};

type PeopleContextType = {
  peopleList: Person[];
  setPeopleList: (v: Person[]) => void;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  peopleList: [],
  setPeopleList: () => {},
});

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);

  const contextValue = {
    peopleList,
    setPeopleList,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};

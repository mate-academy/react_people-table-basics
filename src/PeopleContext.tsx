import React, { createContext, useState } from 'react';
import { Person } from './types';

interface ContextProps {
  peopleList: Person[];
  setPeopleList: (list: Person[]) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
  isError: boolean;
  setIsError: (b: boolean) => void;
}

interface Props {
  children: React.ReactNode;
}

export const PeopleList = createContext<ContextProps>({
  peopleList: [],
  setPeopleList: () => { },
  isLoading: false,
  setIsLoading: () => { },
  isError: false,
  setIsError: () => { },
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <PeopleList.Provider value={{
      peopleList,
      isLoading,
      isError,
      setPeopleList,
      setIsLoading,
      setIsError,
    }}
    >
      {children}
    </PeopleList.Provider>
  );
};

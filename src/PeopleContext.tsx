import React, { createContext, useState } from 'react';
import { Person } from './types';

type ContextProps = {
  peopleList: Person[];
  setPeopleList: (list: Person[]) => void;
  isLoading: boolean;
  setIsLoading: (b: boolean) => void;
  isVisibleError: boolean;
  setIsVisibleError: (b: boolean) => void;
};

export const PeopleContext = createContext<ContextProps>({
  peopleList: [],
  setPeopleList: () => { },
  isLoading: false,
  setIsLoading: () => { },
  isVisibleError: false,
  setIsVisibleError: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleError, setIsVisibleError] = useState(false);

  return (
    <PeopleContext.Provider value={{
      peopleList,
      setPeopleList,
      isLoading,
      setIsLoading,
      isVisibleError,
      setIsVisibleError,
    }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

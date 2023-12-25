import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Person } from '../../types';

interface PeopleContextInterface {
  people: Person[],
  setPeople: (arg: Person[]) => void,
  isLoading: boolean,
  setIsLoading: (arg: boolean) => void,
  hasError: boolean,
  setHasError: (arg: boolean) => void,
}

const PeopleContext = createContext<PeopleContextInterface>({
  people: [],
  setPeople: () => { },
  isLoading: false,
  setIsLoading: () => { },
  hasError: false,
  setHasError: () => { },
});

type Props = {
  children: React.ReactNode
};

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const value = useMemo(() => ({
    people,
    isLoading,
    hasError,
    setPeople,
    setIsLoading,
    setHasError,
  }), [
    people,
    isLoading,
    hasError,
    setPeople,
    setIsLoading,
    setHasError,
  ]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeopleContext = () => useContext(PeopleContext);

import {
  FC, ReactNode, createContext, useCallback, useContext, useState,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { getParents } from '../utils/getParents';

type PeopleContextType = {
  people: Person[] | null;
  resetPeople: () => void;
  isLoading: boolean;
  isError: boolean;
  getPeopleFromApi: () => void;
};

const PeopleContext = createContext<PeopleContextType>({} as PeopleContextType);

type Props = {
  children: ReactNode;
};

export const PeopleProvider: FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const getPeopleWithParents = useCallback(() => {
    setIsLoading(true);
    getPeople()
      .then(data => setPeople(getParents(data)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const resetPeople = useCallback(() => {
    setPeople(null);
  }, []);

  const value = {
    resetPeople,
    people,
    isLoading,
    isError,
    getPeopleFromApi: getPeopleWithParents,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => useContext(PeopleContext);

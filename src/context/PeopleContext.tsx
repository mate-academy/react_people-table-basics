import React, { ReactNode, useEffect, useState } from 'react';
import { Person, PeopleContextType } from '../types';
import * as peopleApi from '../api';
const initialPeopleContext: PeopleContextType = {
  people: [],
  isLoading: false,
  hasError: false,
};

export const PeopleContext =
  React.createContext<PeopleContextType>(initialPeopleContext);

type Props = {
  children: ReactNode;
};

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  const loadPeople = async () => {
    try {
      setIsLoading(true);
      setHasError(false);
      const loadedPeople = await peopleApi.getPeople();

      setPeople(loadedPeople);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const value = { people, isLoading, hasError };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

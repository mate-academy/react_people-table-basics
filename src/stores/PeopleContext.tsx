import React, { useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

const initialState = {
  people: [] as Person[],
  isLoading: false,
  loadingError: false,
};

export const PeopleContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadingError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const state = {
    people,
    isLoading,
    loadingError,
  };

  return (
    <PeopleContext.Provider value={state}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => useContext(PeopleContext);

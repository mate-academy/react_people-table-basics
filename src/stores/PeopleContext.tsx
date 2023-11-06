import * as React from 'react';
import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

const initState = {
  people: [] as Person[],
  isLoading: false,
  loadingError: false,
};

export const PeopleContext = React.createContext(initState);

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

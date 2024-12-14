import React, { createContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

interface PeopleContextType {
  people: Person[];
  loader: boolean;
  loadingError: boolean;
  setPeople: (people: Person[]) => void;
}

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  loader: false,
  loadingError: false,
  setPeople: () => {},
});

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [loader, setLoader] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then(result => setPeople(result))
      .catch(() => setLoadingError(true))
      .finally(() => setLoader(false));
  }, []);

  const contextValue = {
    people,
    loader,
    loadingError,
    setPeople,
  };

  return (
    <PeopleContext.Provider value={contextValue}>
      {children}
    </PeopleContext.Provider>
  );
};

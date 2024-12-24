import React, { useEffect, useMemo, useState } from 'react';

import * as person from '../api';

import { Person } from '../types';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  isError: false,
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    person
      .getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = useMemo(
    () => ({
      people,
      isLoading,
      isError,
    }),
    [people, isLoading, isError],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

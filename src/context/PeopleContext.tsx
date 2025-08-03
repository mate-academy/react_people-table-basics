import { createContext, useMemo, useState } from 'react';
import { PeopleContextType } from '../types/PeopleContextType';
import { Person } from '../types';

type Props = {
  children: React.ReactNode;
};

export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  setPeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  hasLoadingError: false,
  setHasLoadingError: () => {},
});

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const value = useMemo(
    () => ({
      people,
      setPeople,
      isLoading,
      setIsLoading,
      hasLoadingError,
      setHasLoadingError,
    }),
    [people, isLoading, hasLoadingError],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

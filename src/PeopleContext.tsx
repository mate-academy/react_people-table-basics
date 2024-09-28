import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { PeopleContextValue } from './types/ContextValues';
import { getPeople } from './api';
import { Person } from './types';
import { ErrorMessages } from './types/ErrorMessages';

export const PeopleContext = createContext<PeopleContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPeople = useCallback(async () => {
    setIsloading(true);

    try {
      const loadedPeople = await getPeople();

      setPeople(loadedPeople);
    } catch {
      setErrorMessage(ErrorMessages.PeopleLoadError);
    } finally {
      setIsloading(false);
    }
  }, []);

  const peopleValue = useMemo(
    () => ({
      people,
      isLoading,
      errorMessage,
      fetchPeople,
    }),
    [people, isLoading, errorMessage, fetchPeople],
  );

  return (
    <PeopleContext.Provider value={peopleValue}>
      {children}
    </PeopleContext.Provider>
  );
};

export const useValues = () => {
  const value = useContext(PeopleContext);

  if (!value) {
    throw new Error('Something is wrong with provider PeopleContext');
  }

  return value;
};

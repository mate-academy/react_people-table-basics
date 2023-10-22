import React, { createContext, useCallback, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';

type AppContextType = {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  fetchPeople: () => Promise<void>;
};

type Props = {
  children: React.ReactNode;
};

const defaultValues: AppContextType = {
  people: [],
  setPeople: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: '',
  setError: () => {},
  fetchPeople: async () => {},
};

export const appContext = createContext<AppContextType>(defaultValues);

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getPeople();

      const peopleWithFamilyLinks: Person[] = response.map((person) => {
        const mother = response.find(
          (potentialMother) => potentialMother.name === person.motherName,
        );

        const father = response.find(
          (potentialFather) => potentialFather.name === person.fatherName,
        );

        return {
          ...person,
          mother,
          father,
        };
      });

      setPeople(peopleWithFamilyLinks);
    } catch {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const state: AppContextType = {
    people,
    setPeople,
    isLoading,
    setIsLoading,
    error,
    setError,
    fetchPeople,
  };

  return <appContext.Provider value={state}>{children}</appContext.Provider>;
};

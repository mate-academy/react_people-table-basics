import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  errorMsg: string;
};

export const PeopleContext = React.createContext<PeopleContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
        setIsLoading(false);
        setErrorMsg('');
      } catch {
        setErrorMsg('Something went wrong');
      }
    };

    fetchPeople();
  }, []);

  const value = { people, isLoading, errorMsg };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeopleContext must be used within a PeopleProvider');
  }

  return context;
};

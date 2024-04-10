import React, { useContext, useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../utils/api';

interface PeopleContextType {
  people: Person[];
  error: string;
  isLoading: boolean;
}

const contextValue: PeopleContextType = {
  people: [],
  error: '',
  isLoading: false,
};

export const PeopleContext =
  React.createContext<PeopleContextType>(contextValue);

interface Props {
  children: React.ReactNode;
}

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, error, isLoading }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('error');
  }

  return context;
};

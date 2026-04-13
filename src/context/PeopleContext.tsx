import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Person } from '../types';

interface PeopleContextType {
  people: Person[];
  loading: boolean;
  error: string | null;
  setPeople: (people: Person[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <PeopleContext.Provider
      value={{ people, loading, error, setPeople, setLoading, setError }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeople must be used within PeopleProvider');
  }

  return context;
};

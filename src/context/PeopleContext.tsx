import React, { createContext, useContext, useState, useCallback } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

interface PeopleContextType {
  people: Person[];
  error: boolean;
  loading: boolean;
  getAllPeople: () => void;
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function transformData(data: Person[]) {
    return data.map(person => {
      const mother = data.find(m => person.motherName === m.name);
      const father = data.find(f => person.fatherName === f.name);

      return { ...person, mother, father };
    });
  }

  const getAllPeople = useCallback(async () => {
    try {
      setError(false);
      setLoading(true);
      const data = await getPeople();

      setPeople(transformData(data));
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValues = {
    people,
    error,
    loading,
    getAllPeople,
  };

  return (
    <PeopleContext.Provider value={contextValues}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeopleContext = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error('usePeopleContext must be used within a PeopleProvider');
  }

  return context;
};

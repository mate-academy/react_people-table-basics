import React, { useMemo, useState } from 'react';
import { Person } from '../types';

interface Props {
  people: Person[] | null,
  errorMassage: boolean,
  setPeople: (value: Person[] | null) => void,
  // person: Person,
  // setPerson: (value: Person) => void
  setErrorMassage: (value: boolean) => void,
  setLoading: (value: boolean) => void;
  loading: boolean;
}

export const PeopleContex = React.createContext<Props>({
  people: null,
  setPeople: () => {},
  setErrorMassage: () => {},
  errorMassage: false,
  setLoading: () => {},
  loading: false,
});

type Prop = {
  children:React.ReactNode
};

export const PeopleProvider: React.FC<Prop> = ({ children }) => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errorMassage, setErrorMassage] = useState(false);
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => ({
    people,
    errorMassage,
    loading,
    setErrorMassage,
    setLoading,
    // person,
    setPeople,
    // setPerson,
  }), [people, errorMassage, loading]);

  return (
    <PeopleContex.Provider value={value}>
      {children}
    </PeopleContex.Provider>
  );
};

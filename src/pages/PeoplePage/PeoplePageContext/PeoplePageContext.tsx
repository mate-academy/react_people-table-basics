import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Person } from '../../../types';

type PeoplePageContextType = {
  people: Person[],
  setPeople: (arg: Person[]) => void,
  loading: boolean,
  setLoading: (arg: boolean) => void,
  error: boolean,
  setError: (arg: boolean) => void,
};

const PeoplePageContext = createContext<PeoplePageContextType>({
  people: [],
  setPeople: () => { },
  loading: false,
  setLoading: () => { },
  error: false,
  setError: () => { },
});

type Props = {
  children: React.ReactNode
};

export const PeoplePageContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const value = useMemo(() => ({
    people,
    setPeople,
    loading,
    setLoading,
    error,
    setError,
  }), [people, loading, error]);

  return (
    <PeoplePageContext.Provider value={value}>
      {children}
    </PeoplePageContext.Provider>
  );
};

export const usePeoplePageContext = () => useContext(PeoplePageContext);

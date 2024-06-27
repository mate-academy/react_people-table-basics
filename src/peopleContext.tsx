import React, { useMemo, useState } from 'react';
// import { getPeople } from './api';

import { Person } from './types';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  loader: boolean;
  people: Person[];
  current: Person | null;
  currentPage: string;
  warning: string;
  setWarning: (warn: string) => void;
  setPeople: (value: Person[]) => void;
  setCurrent: (value: Person | null) => void;
  setLoader: (value: boolean) => void;
  setCurrentPage: (value: string) => void;
};

export const PeopleContext = React.createContext<ContextType>({
  loader: false,
  people: [],
  current: null,
  currentPage: '/',
  warning: '',
  setWarning: () => {},
  setPeople: () => {},
  setCurrent: () => {},
  setLoader: () => {},
  setCurrentPage: () => {},
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState('/');
  const [warning, setWarning] = useState('');
  const [people, setPeople] = useState<Person[]>([]);
  const [current, setCurrent] = useState<Person | null>(null);


  const value = useMemo(
    () => ({
      loader,
      people,
      current,
      currentPage,
      warning,
      setWarning,
      setPeople,
      setCurrent,
      setLoader,
      setCurrentPage,
    }),
    [people, current, loader, warning],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

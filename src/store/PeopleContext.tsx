import React, { useState, useMemo, useCallback } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  loading: false,
  errorMessage: '',
  loadPeople: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loadPeople = useCallback(() => {
    setLoading(true);

    return getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      people,
      loading,
      errorMessage,
      loadPeople,
    }),
    [people, loading, errorMessage, loadPeople],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

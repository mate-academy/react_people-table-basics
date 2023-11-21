import React, { useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  loading: false,
  loadingError: false,
});

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadingError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PeopleContext.Provider value={{ people, loading, loadingError }}>
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  const people = useContext(PeopleContext);

  return people;
}

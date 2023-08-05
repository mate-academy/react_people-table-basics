import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getPeople } from '../api';

import { Error, Person } from '../types';

import { getPreparedPeople } from '../utils/getPreparedPeople';

interface Context {
  people: Person[];
  setPeople: (people: Person[]) => void,
  errorMessage: Error | null,
  setErrorMessage: (message: Error | null) => void,
  loading: boolean,
  setLoading: (status: boolean) => void,
}

export const PeopleContext = createContext<Context>({
  people: [],
  setPeople: () => { },
  errorMessage: null,
  setErrorMessage: () => { },
  loading: false,
  setLoading: () => { },
});

export const PeopleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<null | Error>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        if (peopleFromServer.length === 0) {
          setErrorMessage(Error.DATA);

          return;
        }

        const peopleWithParents = getPreparedPeople(peopleFromServer);

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorMessage(Error.SERVER))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => {
    return {
      people,
      setPeople,
      errorMessage,
      setErrorMessage,
      loading,
      setLoading,
    };
  }, [people, errorMessage, loading]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

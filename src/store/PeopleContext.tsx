import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Person } from '../types';
import * as api from '../api';

type Props = {
  children: React.ReactNode;
};

interface Peoples {
  peoples: Person[];
  loader: boolean;
  errorMessage: string;
}

export const PeopleContext = createContext<Peoples>({
  peoples: [],
  loader: false,
  errorMessage: '',
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  function loadPeoples() {
    setLoader(true);
    api.getPeople()
      .then((res) => setPeoples(res))
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setLoader(false);
      });
  }

  useEffect(loadPeoples, []);

  const value = useMemo(() => ({
    peoples, loader, errorMessage,
  }), [peoples, loader, errorMessage]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

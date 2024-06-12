import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { useLocation } from 'react-router-dom';
import { getPerson } from '../service/Person';

type PeopleContextType = {
  isLoading: boolean;
  people: Person[];
  pathname: string;
  errorMessage: string;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  isLoading: false,
  people: [],
  pathname: '',
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      getPerson()
        .then(setPeople)
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setIsLoading(false));
    }, 3000);
  }, []);

  const value = useMemo(
    () => ({
      people,
      isLoading,
      pathname,
      errorMessage,
    }),
    [people, isLoading, pathname],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

import { FC, useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';
import React from 'react';
type PeoplesContextType = {
  persons: Person[];
  isLoading: boolean;
  errorMessage: string;
};
export const PeoplesContext = React.createContext<PeoplesContextType>({
  persons: [],
  isLoading: false,
  errorMessage: '',
});
type Props = {
  children: React.ReactNode;
};
export const PeoplesProvider: FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setisLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setisLoading(false));
  }, []);
  const value = {
    persons: people,
    isLoading,
    errorMessage,
  };

  return (
    <PeoplesContext.Provider value={value}>{children}</PeoplesContext.Provider>
  );
};

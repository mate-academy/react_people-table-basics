import { FC, useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';
import React from 'react';
type PeoplesContextType = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
};
export const PeoplesContext = React.createContext<PeoplesContextType>({
  people: [],
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
    people,
    isLoading,
    errorMessage,
  };

  return (
    <PeoplesContext.Provider value={value}>{children}</PeoplesContext.Provider>
  );
};

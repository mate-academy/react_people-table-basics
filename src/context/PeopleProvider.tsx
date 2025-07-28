// src/context/PeopleProvider.tsx
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleContext } from './PeopleContext';

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peoples, setPeoples] = useState<Person[]>();
  const [peopleLoadingError, setPeopleLoadingError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeoples(data);
        setIsLoading(false);
      })
      .catch(() => {
        setPeopleLoadingError('Something went wrong');
        setTimeout(() => {
          setPeopleLoadingError('');
        }, 3000);
      });
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        peoples,
        isLoading,
        peopleLoadingError,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

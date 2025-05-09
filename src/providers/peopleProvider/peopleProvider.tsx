import React, { PropsWithChildren, useState } from 'react';
import { PeopleContext } from '../../store/peopleContext/peopleContext';
import { IPerson } from '../../types';

export const PeopleProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [people, setPeople] = useState<IPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  return (
    <PeopleContext.Provider
      value={{ isLoading, setIsLoading, error, setError, people, setPeople }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

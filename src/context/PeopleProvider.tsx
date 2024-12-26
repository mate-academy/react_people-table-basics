import { useEffect, useState } from 'react';
import { PeopleContext } from './PeopleContext';
import { Person } from '../types';
import { getPeople } from '../api';

type PeopleProviderType = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<PeopleProviderType> = props => {
  const { children } = props;

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = {
    people,
    isLoading,
    errorMessage,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};

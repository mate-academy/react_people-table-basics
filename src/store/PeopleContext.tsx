import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = React.createContext<({
  people: Person[],
  isLoading: boolean,
  hasError: string,
})>({
    people: [],
    isLoading: false,
    hasError: '',
  });

type Props = {
  children: React.ReactNode;
};

export const PeopleProvide: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch (error) {
        setHasError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const state = {
    people,
    isLoading,
    hasError,
  };

  return (
    <PeopleContext.Provider value={state}>
      {children}
    </PeopleContext.Provider>
  );
};

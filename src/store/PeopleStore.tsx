import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  isPeopleLoading: true,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchPerson = await getPeople();

        setPeople(fetchPerson);
      } catch (error) {
        throw error;
      } finally {
        setIsPeopleLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, isPeopleLoading }}>
      {children}
    </PeopleContext.Provider>
  );
};

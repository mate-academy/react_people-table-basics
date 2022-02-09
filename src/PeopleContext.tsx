import React, { useEffect, useState } from 'react';
import { getPeople } from './api/people';
import { Person } from './components/PersonRow';

export const PeopleContext = React.createContext<Person[] | null>(null);

export const PeopleProvider: React.FC = ({ children }) => {
  const [people, setPeople] = useState<Person[] | null>(null);

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeople(response);
      });
  }, []);

  return (
    <PeopleContext.Provider value={people}>
      {children}
    </PeopleContext.Provider>

  );
};

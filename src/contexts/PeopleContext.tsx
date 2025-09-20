import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeopleContext = React.createContext<{
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  error: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPerson: string | null;
  setSelectedPerson: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  people: [],
  setPeople: () => {},
  error: false,
  setIsError: () => {},
  selectedPerson: null,
  setSelectedPerson: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setIsError] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  useEffect(() => {
    async function getOurPeople() {
      try {
        const ourPeople = await getPeople();

        setPeople(ourPeople);
      } catch {
        setIsError(true);
      }
    }

    getOurPeople();
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        error,
        setIsError,
        selectedPerson,
        setSelectedPerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

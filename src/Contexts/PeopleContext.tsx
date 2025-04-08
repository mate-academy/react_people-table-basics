import React, { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';

interface PeopleContextType {
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = {
  children: React.ReactNode;
};

const defaultContext: PeopleContextType = {
  people: [],
  setPeople: () => {},
  isError: false,
  setError: () => {},
  isLoading: false,
  setLoading: () => {},
};

export const PeopleContext = React.createContext(defaultContext);

export const PeopleProvider = ({ children }: Props) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const peopleFromServer = await getPeople();

        const preparedPeople = peopleFromServer.map((person, _, arr) => {
          return {
            ...person,
            father: arr.find(
              personToFind => personToFind.name === person.fatherName,
            ),
            mother: arr.find(
              personToFind => personToFind.name === person.motherName,
            ),
          };
        });

        setPeople(preparedPeople);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        isLoading,
        setLoading,
        isError,
        setError,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

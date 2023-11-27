import React, { createContext, useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';

type Context = {
  people: Person[]
  findPersonFather: (people: Person[], person: Person) => string | undefined
  findPersonMother: (people: Person[], person: Person) => string | undefined
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsPageActive: React.Dispatch<React.SetStateAction<boolean>>
  error: string | null
};

type Props = {
  children: React.ReactNode
};

const initialTabContext:Context = {
  people: [],
  findPersonFather: () => undefined,
  findPersonMother: () => undefined,
  isLoading: false,
  setIsLoading: () => {},
  setIsPageActive: () => {},
  error: null,
};

const findPersonFather = (people: Person[], person: Person) => {
  const father = people.find(p => p.name === person.fatherName);

  return father?.slug;
};

const findPersonMother = (people: Person[], person: Person) => {
  const mother = people.find(p => p.name === person.motherName);

  return mother?.slug;
};

export const PeopleContext = createContext<Context>(initialTabContext);

export const PeopleContent: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPageActive, setIsPageActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(usersFromServer => {
        setPeople(usersFromServer);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isPageActive]);

  return (
    <PeopleContext.Provider value={{
      people,
      findPersonFather,
      findPersonMother,
      isLoading,
      setIsLoading,
      setIsPageActive,
      error,
    }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

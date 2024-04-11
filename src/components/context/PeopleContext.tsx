import React, { useContext, useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../utils/api';
import { PeopleError } from '../../types/enums';

interface PeopleContextType {
  people: Person[];
  errorMessage: PeopleError;
  isLoading: boolean;
}

const contextValue: PeopleContextType = {
  people: [],
  errorMessage: PeopleError.noError,
  isLoading: false,
};

export const PeopleContext =
  React.createContext<PeopleContextType>(contextValue);

interface Props {
  children: React.ReactNode;
}

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(PeopleError.noError);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
      } catch {
        setErrorMessage(PeopleError.requestError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, errorMessage, isLoading }}>
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);

  if (!context) {
    throw new Error(PeopleError.contextError);
  }

  return context;
};

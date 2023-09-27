import {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

interface PeopleContextType {
  people: Person[];
  isPeopleLoading: boolean;
  errorMessage: string;
}

const initialValue: PeopleContextType = {
  people: [],
  isPeopleLoading: false,
  errorMessage: '',
};

export const PeopleContext = createContext<PeopleContextType>(initialValue);

interface Props {
  children: ReactNode;
}

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAndSetPeople = async () => {
      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('An unknown error occurred');
        }
      } finally {
        setIsPeopleLoading(false);
      }
    };

    fetchAndSetPeople();
  }, []);

  return (
    <PeopleContext.Provider value={{ people, isPeopleLoading, errorMessage }}>
      {children}
    </PeopleContext.Provider>
  );
};

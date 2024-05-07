import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  people: Person[];
  setPeople: (v: Person[]) => void;
  errorMessage: string;
  setErrorMessage: (v: string) => void;
  loader: boolean;
  setLoader: (v: boolean) => void;
  notification: string;
  setNotification: (v: string) => void;
};
export const PeopleContext = React.createContext<ContextType>({
  people: [],
  setPeople: () => [],
  errorMessage: '',
  setErrorMessage: () => {},
  loader: false,
  setLoader: () => [],
  notification: '',
  setNotification: () => {},
});

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [notification, setNotification] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setErrorMessage('');
    setNotification('');
    setLoader(true);
    const fetchePeople = async () => {
      try {
        const getPerson = await getPeople();
        setPeople(getPerson);
      } catch (error) {
        setErrorMessage('Something went wrong');
      } finally {
        setLoader(false);
        if (people.length === 0) {
          setNotification('There are no people on the server');
        }
      }
    };

    fetchePeople();
  }, []);

  const peopleTools = {
    notification,
    setNotification,
    people,
    setPeople,
    errorMessage,
    setErrorMessage,
    loader,
    setLoader,
  };
  return (
    <PeopleContext.Provider value={peopleTools}>
      {children}
    </PeopleContext.Provider>
  );
};

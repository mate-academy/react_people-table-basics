import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleContextType } from './PeopleContextType';

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  loading: false,
  errorMessage: '',
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

  const preparePeople = (data: Person[]) => {
    const changedPeople = data.map(child => {
      let mother;
      let father;

      if (child.motherName) {
        mother = data.find(({ name }) => child.motherName === name);
      }

      if (child.fatherName) {
        father = data.find(({ name }) => child.fatherName === name);
      }

      return { ...child, father, mother };
    });

    setPeople(changedPeople);
  };

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(preparePeople)
      .catch(() => {
        setErrorMessage('Unable to load people');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const value = useMemo(() => ({
    people,
    loading,
    errorMessage,
  }), [
    loading,
    errorMessage,
  ]);

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

export function usePeople() {
  return useContext(PeopleContext);
}

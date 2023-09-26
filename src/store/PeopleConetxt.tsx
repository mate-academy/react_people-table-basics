import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PersonType } from '../types';
import { getPeople } from '../api';

type PeopleContextType = {
  peopleList: PersonType[];
  errorMessage: string;
  isLoading: boolean;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  peopleList: [] as PersonType[],
  errorMessage: '',
  isLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [peopleList, setPeopleList] = useState<PersonType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/people') {
      (async () => {
        setIsLoading(true);
        try {
          const people = await getPeople();
          const copy = people.map(child => {
            const mother = people
              .find(person => child.motherName === person.name);
            const father = people
              .find(person => child.fatherName === person.name);

            if (mother && father) {
              return { ...child, mother, father };
            }

            if (mother) {
              return { ...child, mother };
            }

            if (father) {
              return { ...child, father };
            }

            return child;
          });

          setPeopleList(copy);
        } catch {
          setErrorMessage('Something went wrong');
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [pathname]);

  const value = {
    peopleList,
    errorMessage,
    isLoading,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

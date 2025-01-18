import { createContext, useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

// Тип, который описывает данные, передаваемые в контекст
interface ContextValue {
  peopleFromServer: Person[];
  isLoading: boolean;
  isError: boolean;
}

export const ContextPeople = createContext<ContextValue>({
  peopleFromServer: [],
  isLoading: true, // По умолчанию считаем, что данные загружаются
  isError: false, // Ошибка по умолчанию отсутствует
});

export const ContextPeopleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeopleFromServer(people);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <ContextPeople.Provider value={{ peopleFromServer, isLoading, isError }}>
      {children}
    </ContextPeople.Provider>
  );
};

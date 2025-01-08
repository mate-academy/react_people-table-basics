import { createContext, ReactNode, useState } from 'react';
import { Person } from '../types/Person';

export const PeopleContext = createContext<{
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[] | []>>;
  isError: string;
  setIsError: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  people: [],
  setPeople: () => {},
  isError: '',
  setIsError: () => {},
  loading: false,
  setLoading: () => {},
});

export const PeopleProvider = ({ children }: { children: ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <PeopleContext.Provider
      value={{
        people,
        setPeople,
        isError,
        setIsError,
        loading,
        setLoading,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

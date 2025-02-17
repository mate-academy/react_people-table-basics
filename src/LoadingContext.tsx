import { createContext, useContext, useState } from 'react';
import { Person } from './types';

type Props = {
  children: React.ReactNode;
};

type ContextProps = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  people: Person[];
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>;
  fetchError: boolean;
  setFetchError: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoadingContext = createContext<ContextProps | null>(null);

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [fetchError, setFetchError] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
        people,
        setPeople,
        fetchError,
        setFetchError,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): ContextProps => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};

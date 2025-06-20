import { createContext, ReactNode, useEffect, useState } from "react"
import { Person } from "../types";
import { getPeople } from "../api";
import { useLocation } from "react-router-dom";

type AppContextType = {
  personList: Person[] | null;
  setPersonList: (person: Person[] | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isError: boolean;
  setIsError: (error: boolean) => void;
}

export const AppContext = createContext({} as AppContextType);

type Props = {
  children: ReactNode;
}

export const MainProvider: React.FC<Props> = ({ children }) => {
  const [personList, setPersonList] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation().pathname;

  useEffect(() => {
  if (location.startsWith('/people')) {
    (async () => {
      setIsLoading(true);

      try {
        const list = await getPeople();
        setPersonList(list);

        setIsError(false);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }
}, [location]);


  return (
    <AppContext.Provider 
      value={{
        personList,
        setPersonList,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

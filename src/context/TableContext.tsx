import {
  FC, PropsWithChildren, createContext, useContext, useEffect, useState,
} from 'react';
import { getPeople } from '../utils/fetchHelper';
import { Person } from '../types';
import { matchParents } from '../utils/matchParents';

type TableContextType = {
  people: Person[] | [],
  isLoading: boolean,
  showError: boolean,
};

const TableContextDefault = {
  people: [],
  isLoading: false,
  showError: false,
};

export const TableContext
  = createContext<TableContextType>(TableContextDefault);

type Props = PropsWithChildren;

export const TableContextProvider: FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const response = await getPeople();
        const peopleWithParents = matchParents(response as Person[]);

        setPeople(peopleWithParents);
      } catch (error) {
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const TableContextValue = {
    people,
    isLoading,
    showError,
  };

  return (
    <TableContext.Provider value={TableContextValue}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableProvider = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('TableContext must be used inside of TableContexProvider');
  }

  return context;
};

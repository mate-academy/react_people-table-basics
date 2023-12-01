import React, { ReactNode, useContext, useState } from 'react';
import { Person } from '../../types';

interface ValuesTypes {
  peoples: Person[];
  setPeoples: React.Dispatch<React.SetStateAction<Person[]>>;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: ValuesTypes = {
  peoples: [],
  setPeoples: () => {},
  hasError: false,
  setHasError: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

const TableContext = React.createContext<ValuesTypes>(defaultValue);

export const TableProvider: React
  .FC<{ children: ReactNode }> = ({ children }) => {
  const [peoples, setPeoples] = useState<Person[]>([]);

  const [hasError, setHasError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const values: ValuesTypes = {
    peoples,
    setPeoples,
    hasError,
    setHasError,
    isLoading,
    setIsLoading,
  };

  return (
    <TableContext.Provider value={values}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = (): ValuesTypes => {
  const context = useContext(TableContext);

  return context;
};

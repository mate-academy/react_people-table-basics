import React, { ReactNode, useContext, useState } from 'react';
import { Person } from '../../types';

interface ValuesTypes {
  peoples: Person[] | undefined;
  setPeoples: React.Dispatch<React.SetStateAction<Person[] | undefined>>;
  hasError: boolean;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableContext = React.createContext<ValuesTypes | undefined>(undefined);

if (!TableContext) {
  throw new Error('err');
}

// eslint-disable-next-line max-len
export const TableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [peoples, setPeoples] = useState<Person[] | undefined>(undefined);

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

  if (!context) {
    throw new Error('err');
  }

  return context;
};

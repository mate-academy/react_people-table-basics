import React, { createContext, useState } from 'react';

type ContextData = {
  isError: boolean
  setIsError: (a: boolean) => void
};

export const PeopleContext = createContext<ContextData>({
  isError: false,
  setIsError: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const PeopleContextProvider: React.FC<Props> = ({ children }) => {
  const [isError, setIsError] = useState<boolean>(false);
  const value = {
    isError,
    setIsError,
  };

  return (
    <PeopleContext.Provider value={value}>
      {children}
    </PeopleContext.Provider>
  );
};

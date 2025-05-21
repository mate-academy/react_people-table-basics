/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from 'react';

export const ErrorContext = createContext({
  error: false,
  setError: (_error: boolean) => {},
});

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState(false);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);

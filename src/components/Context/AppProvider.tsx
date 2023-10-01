import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  hasClickedPeopleLink: boolean;
  setHasClickedPeopleLink: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextType>(
  {
    hasClickedPeopleLink: false,
    setHasClickedPeopleLink: () => {},
  },
);

type Props = {
  children: React.ReactNode,
};

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [hasClickedPeopleLink, setHasClickedPeopleLink] = useState(false);

  return (
    <AppContext.Provider
      value={{ hasClickedPeopleLink, setHasClickedPeopleLink }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

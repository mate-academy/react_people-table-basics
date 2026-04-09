import React from 'react';
import { createContext } from 'react';

export const TodosContext = createContext([]);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  return <TodosContext.Provider value={[]}>{children}</TodosContext.Provider>;
};

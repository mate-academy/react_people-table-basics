import React from 'react';
import { Person } from '../types';

type PeopleContextType = {
  people: Person[];
  isLoading: boolean;
  errorMessage: string;
};

export const PeopleContext = React.createContext<PeopleContextType>({
  people: [],
  isLoading: true,
  errorMessage: '',
});

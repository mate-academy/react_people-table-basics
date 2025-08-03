import { useContext } from 'react';
import { PeopleContextType } from '../types/PeopleContextType';
import { PeopleContext } from '../context/PeopleContext';

export const usePeopleContext = (): PeopleContextType =>
  useContext(PeopleContext);

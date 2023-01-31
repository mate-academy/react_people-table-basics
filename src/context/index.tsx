import { createContext } from 'react';
import { Person } from '../types';

export const PeopleContext = createContext<Person[]>([]);

import React from 'react';
import { Person } from './types';

export const PeopleContex = React.createContext<Person[]>([]);

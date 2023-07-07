import { Person } from '../types';

export const getPersonParent = (
  parentName: string | null,
  persons: Person[],
) => persons.find(person => person.name === parentName);

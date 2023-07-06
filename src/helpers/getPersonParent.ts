import { Person } from '../types';

export const getPersonParent = (
  parentName: string | null,
  persons: Person[],
) => {
  return persons.find(person => person.name === parentName);
};

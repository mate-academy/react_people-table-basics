import { Person } from '../types';

export const getParent = (
  people: Person[],
  parentName: string | null,
) => {
  return people.find(person => person.name === parentName) || null;
};

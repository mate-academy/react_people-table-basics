import { Person } from '../types';

export const findParent = (
  people: Person[],
  parentName: string | null,
) => {
  return people.find(person => person.name === parentName) || null;
};

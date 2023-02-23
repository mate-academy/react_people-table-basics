import { Person } from '../types';

export const findParent = (parentName: string, people: Person []) => {
  return people.find(person => person.name === parentName) || null;
};

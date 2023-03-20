import { Person } from '../types';

export const findParents = (peopleData: Person[], name: string | null) => {
  return peopleData.find(person => person.name === name);
};

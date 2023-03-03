import { Person } from '../types';

export const findParentByName = (people: Person[], name:string | null) => {
  return people.find(parent => parent.name === name);
};

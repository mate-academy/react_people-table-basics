import { Person } from '../types';

export const findParent = (peopleData: Person[], name: string | null) => {
  return peopleData.find(pers => pers.name === name);
};

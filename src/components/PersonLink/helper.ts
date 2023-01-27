import { Person } from '../../types';

export const getPersonByName = (array: Person[], name: string | null) => {
  return array.find(man => man.name === name);
};

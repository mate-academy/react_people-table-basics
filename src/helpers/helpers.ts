import { Person } from '../types';

export const getParent = (
  people: Person[],
  parentName: string | null,
) => {
  if (parentName === null) {
    return '';
  }

  return people.find(person => person.name === parentName) || parentName;
};

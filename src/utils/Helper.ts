import { Person } from '../types';

export const findPersonByName = (
  nameToFind: string | null,
  people: Person[],
): Person | null => {
  if (!nameToFind) {
    return null;
  }

  return people.find(({ name }) => name === nameToFind) || null;
};

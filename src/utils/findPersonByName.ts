import { Person } from '../types';

export const findPersonByName = (
  name: string | null,
  people: Person[],
): Person | undefined => {
  if (!name) {
    return undefined;
  }

  return people.find(person => person.name === name);
};

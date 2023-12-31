import { Person } from '../types';

export const getPersonByName = (
  people: Person[],
  personName: string | null,
) => {
  if (!personName) {
    return null;
  }

  return people.find(person => person.name === personName) || null;
};

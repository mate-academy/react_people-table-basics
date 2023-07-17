import { Person } from './types';

export const getPersonByName = (
  people: Person[],
  name: string | null,
): Person | null => (name
  ? people.find(person => person.name === name) || null
  : null
);

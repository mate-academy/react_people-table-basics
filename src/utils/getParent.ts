import { Person } from '../types';

export function getParent(
  people: Person[],
  name: string | null,
): Person | undefined {
  return people.find(person => person.name === name);
}

import { Person } from '../types';

export function findPerson(people: Person[], name: string | null) {
  return people.find(person => person.name === name) || null;
}

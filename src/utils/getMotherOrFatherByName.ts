import { Person } from '../types';

export function getMotherOrFatherByName(people: Person[], name: string) {
  return people.find(person => person.name === name)?.slug;
}

import { Person } from '../types';

export function arePeopleEmpty(people: Person[]) {
  return !people.length;
}

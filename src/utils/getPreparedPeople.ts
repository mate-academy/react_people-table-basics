import { Person } from '../types';
import { getParent } from './getParent';

export function getPreparedPeople(people: Person[]): Person[] {
  return people.map(person => ({
    ...person,
    mother: getParent(people, person.motherName),
    father: getParent(people, person.fatherName),
  }));
}

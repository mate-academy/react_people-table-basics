import { Person } from '../types';

export function getPeopleParents(people: Person[]): Person[] {
  return people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));
}

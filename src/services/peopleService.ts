import { Person } from '../types/Person';

export const findPersonByName = (people: Person[], name: string) =>
  people.find(person => person.name === name);

export const enrichPeople = (people: Person[]): Person[] =>
  people.map(p => ({
    ...p,
    motherName: p.motherName || null,
    fatherName: p.fatherName || null,
  }));

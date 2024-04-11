import { Person } from '../types';

export const preparePeople = (people: Person[]): Person[] => {
  return people.map(person => {
    const mother = person.motherName
      ? people.find(p => p.name === person.motherName) ?? null
      : null;

    const father = person.fatherName
      ? people.find(p => p.name === person.fatherName) ?? null
      : null;

    return {
      ...person,
      mother,
      father,
    };
  });
};

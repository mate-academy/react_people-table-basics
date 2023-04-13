import { Person } from '../types';

export function fillPersonParentsFields(people: Person[]): Person[] {
  return people.map(person => {
    const mother = people.find(({ name }) => person.motherName === name);
    const father = people.find(({ name }) => person.fatherName === name);

    return {
      ...person,
      mother,
      father,
    };
  });
}

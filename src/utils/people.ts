import { Person } from '../types';

export function preparePeople(people: Person[]): Person[] {
  return people.map(person => {
    const mother = people.find(p => p.name === person.motherName);
    const father = people.find(p => p.name === person.fatherName);

    return ({
      ...person,
      mother,
      father,
    });
  });
}

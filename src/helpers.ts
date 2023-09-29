import { Person } from './types';

export function preparePeople(people: Person[]): Person[] {
  return people.map(person => {
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    const newPerson = { ...person };

    if (mother) {
      newPerson.mother = { ...mother };
    }

    if (father) {
      newPerson.father = { ...father };
    }

    return newPerson;
  });
}

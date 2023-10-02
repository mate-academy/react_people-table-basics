import { Person } from '../types';

export function getPreparedPeople(people: Person[]) {
  return people.map((person) => {
    const mother = people
      .find(({ name }) => name === person.motherName);
    const father = people
      .find(({ name }) => name === person.fatherName);

    return { ...person, mother, father };
  });
}

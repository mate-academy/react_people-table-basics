import { Person } from '../types';

export function addParentsToPeople(people: Person[]) {
  return people.map((person) => {
    const mother = people
      .find((personMother) => personMother.name === person.motherName);
    const father = people
      .find((personFather) => personFather.name === person.fatherName);

    return { ...person, mother, father };
  });
}

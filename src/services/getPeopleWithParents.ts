import { Person } from "../types";

export function getPeopleWithParents(people: Person[]) {
  const copyPeople = [...people];

  for (const copyPerson of copyPeople) {
    people.forEach(person => {
      if (person.name === copyPerson.fatherName) {
        copyPerson.father = person;
      }
      if (person.name === copyPerson.motherName) {
        copyPerson.mother = person;
      }
    });
  }

  return copyPeople;
}

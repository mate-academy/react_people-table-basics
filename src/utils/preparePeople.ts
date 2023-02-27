import { Person } from "../types";

export const preparePeople = (people: Person[]) => {
  return people.map(human => ({
    ...human,
    mother: people.find(person => person.name === human.motherName),
    father: people.find(person => person.name === human.fatherName),
  }))
};

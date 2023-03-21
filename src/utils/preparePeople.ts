import { Person } from '../types';

export const preparePeople = (people: Person[]): Person[] => {
  return people.map(person => {
    const findMother = people.find(mother => person.motherName === mother.name);
    const findFather = people.find(father => person.fatherName === father.name);
    const personCopy = { ...person };

    personCopy.mother = findMother;
    personCopy.father = findFather;

    return personCopy;
  });
};

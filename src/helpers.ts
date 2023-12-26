import { Person } from './types';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => person.motherName === mom.name || null);
    const father = people.find(dad => person.fatherName === dad.name || null);
    const motherName = !person.motherName ? '-' : person.motherName;
    const fatherName = !person.fatherName ? '-' : person.fatherName;

    return {
      ...person,
      motherName,
      fatherName,
      father,
      mother,
    };
  });
};

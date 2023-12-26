import { Person } from './types';

const NOT_SET_VALUE = '-';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(mom => person.motherName === mom.name);
    const father = people.find(dad => person.fatherName === dad.name);
    const motherName = !person.motherName ? NOT_SET_VALUE : person.motherName;
    const fatherName = !person.fatherName ? NOT_SET_VALUE : person.fatherName;

    return {
      ...person,
      motherName,
      fatherName,
      father,
      mother,
    };
  });
};

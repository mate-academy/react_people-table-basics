import { Person } from './types';

const getFather = (
  fatherName: string | null,
  array: Person[],
): Person | undefined => {
  return array.find(father => father.name === fatherName);
};

const getMother = (
  motherName: string | null,
  array: Person[],
): Person | undefined => {
  return array.find(mother => mother.name === motherName);
};

export const getProcessPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    const father = getFather(person.fatherName, people);
    const mother = getMother(person.motherName, people);

    return {
      ...person,
      mother,
      father,
    };
  });
};

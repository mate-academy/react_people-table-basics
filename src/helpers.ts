import { Person } from './types';

const getParent = (
  parentName: string | null,
  array: Person[],
): Person | undefined => {
  return array.find(person => person.name === parentName);
};

export const getProcessPeople = (people: Person[]): Person[] => {
  return people.map(person => {
    const father = getParent(person.fatherName, people);
    const mother = getParent(person.motherName, people);

    return {
      ...person,
      mother,
      father,
    };
  });
};

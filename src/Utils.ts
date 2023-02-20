import { Person } from './types';

export const findMother = (people: Person[], motherName: string | null) => {
  const mother = people?.find(person => person.name === motherName);

  return mother || null;
};

export const findFather = (people: Person[], fatherName: string | null) => {
  const father = people?.find(person => person.name === fatherName);

  return father || null;
};

import { Person } from './types';

export const getPersonParents = (person: Person, people: Person[]): Person => {
  const { fatherName, motherName } = person;

  const personFather = people.find(
    parent => parent.name === fatherName,
  );

  const personMother = people.find(
    parent => parent.name === motherName,
  );

  return {
    ...person,
    father: personFather,
    mother: personMother,
  };
};

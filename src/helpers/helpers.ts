import { Person } from '../types';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(woman => woman.name === person.motherName) || null,
    father: people.find(man => man.name === person.fatherName) || null,
  }));
};

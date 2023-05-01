import { Person } from '../types';

export const findParent = (
  people: Person[],
) => (
  people.map(person => ({
    ...person,
    mother: people.find((mother) => mother.name === person.motherName) || null,
    father: people.find((father) => father.name === person.fatherName) || null,
  }))
);

import { Person } from '../../types';

export const getPreparedPeople = (people: Person[]) => (
  people.map(person => ({
    ...person,
    mother: people.find(mom => mom.name === person.motherName),
    father: people.find(dad => dad.name === person.fatherName),
  }))
);

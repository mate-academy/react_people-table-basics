import { Person } from '../types';

export const getPreparedPeople = (people: Person[]) => {
  return people.map(person => ({
    ...person,
    mother: people.find(mother => mother.name === person.motherName),

    father: people.find(father => father.name === person.fatherName),
  }));
};

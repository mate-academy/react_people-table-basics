import { Person } from './types';

export const getPreparedPeople = (people: Person[]) => {
  return people.map(person => {
    return {
      ...person,
      mother: people
        .find(person1 => person1.name === person.motherName),
      father: people
        .find(person1 => person1.name === person.fatherName),
    };
  });
};

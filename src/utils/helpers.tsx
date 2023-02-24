import { Person } from '../types';

export const preparedPeople = (people: Person []) => {
  return people.map(person => {
    return {
      ...person,
      mother: people.find(parent => parent.name === person.motherName) || null,
      father: people.find(parent => parent.name === person.fatherName) || null,
    };
  });
};

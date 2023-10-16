import { Person } from './types';

export const getPreparedPeople = (people: Person[]) => {
  return people.map((person) => {
    const mother = people.find(({ name }) => person.motherName === name);
    const father = people.find(({ name }) => person.fatherName === name);

    return {
      ...person,
      mother,
      father,
    };
  });
};

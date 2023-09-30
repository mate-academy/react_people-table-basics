import { Person } from '../types';

export const getPrepearedPeople = (currentPeople: Person[]) => {
  return currentPeople.map(person => {
    const father = currentPeople.find(
      ({ name }) => name === person.fatherName,
    );

    const mother = currentPeople.find(
      ({ name }) => name === person.motherName,
    );

    return {
      ...person,
      father,
      mother,
    };
  });
};

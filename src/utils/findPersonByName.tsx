import { Person } from '../types';

export const getPreparedPeople = (people: Person[]) => {
  const findPersonByName = (personName: string) => {
    return people.find(({ name }) => name === personName);
  };

  return people.map(person => {
    let mother = null;
    let father = null;

    if (person.motherName) {
      mother = findPersonByName(person.motherName);
    }

    if (person.fatherName) {
      father = findPersonByName(person.fatherName);
    }

    return { ...person, mother, father };
  });
};

import { Person } from '../types';

export const getPreparedPeople = (people: Person[]) => {
  return people.map(person => {
    const getParent = (parentName: string | null) => {
      return people.find(per => per.name === parentName);
    };

    return {
      ...person,
      mother: getParent(person.motherName),
      father: getParent(person.fatherName),
    };
  });
};


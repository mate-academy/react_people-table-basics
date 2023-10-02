import { Person } from '../types';

export const getPreparedPeople = (peopleList: Person[]) => {
  return peopleList.map(person => {
    return {
      ...person,
      mother: peopleList
        .find(mother => mother.name === person.motherName),
      father: peopleList
        .find(father => father.name === person.fatherName),
    };
  });
};

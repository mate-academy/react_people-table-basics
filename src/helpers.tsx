import { Person } from './types';

export const getPeopleWithParents = (people: Person[]) => {
  return people.map(person => {
    const mother = people.find(personA => personA.name === person.motherName);
    const father = people.find(personB => personB.name === person.fatherName);

    return {
      ...person,
      mother: mother || null,
      father: father || null,
    };
  });
};

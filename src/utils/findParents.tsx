import { PersonType } from '../types/PersonType';

export const findParents = (people: PersonType[]) => {
  return people.map(person => {
    return Object.assign(person, {
      mother: people.find(mother => mother.name === person.motherName) || null,
      father: people.find(father => father.name === person.fatherName) || null,
    });
  });
};

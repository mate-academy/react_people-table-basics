import { Person } from '../types';

export const getPeopleWithParents = (people: Person[]) => {
  return people?.map(persone => {
    return {
      ...persone,
      mother: people.find(mother => mother.name === persone.motherName),
      father: people.find(father => father.name === persone.fatherName),
    };
  });
};

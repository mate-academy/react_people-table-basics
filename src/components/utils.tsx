import { Person } from '../types';

export const getPeopleWithParents = (data: Person[]) => {
  const getParent = (parent: string | null) => {
    return data.find(pers => pers.name === parent);
  };

  return data.map(person => ({
    ...person,
    mother: getParent(person.motherName),
    father: getParent(person.fatherName),
  }));
};

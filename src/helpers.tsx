import { Person } from './types';

export const getParents = (persons: Person[], parentType: string) => {
  return persons.filter((person, index) => {
    const parentName = parentType === 'mother'
      ? person.motherName
      : person.fatherName;

    for (let i = 0; i < persons.length; i += 1) {
      if (parentName === null) {
        return false;
      }

      if (i !== index && persons[i].name.includes(parentName)) {
        return true;
      }
    }

    return false;
  }).map((person: Person) => (parentType === 'mother'
    ? person.motherName
    : person.fatherName));
};

import { Person } from '../types';

export const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export enum Gender {
  FEMALE = 'f',
}
export const setPeopleWithParents = (
  visiblePeople: Person[],
  peopleMap: Map<string, Person>,
): Person[] => {
  return visiblePeople.map(person => {
    const mother = peopleMap.get(person.motherName);
    const father = peopleMap.get(person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

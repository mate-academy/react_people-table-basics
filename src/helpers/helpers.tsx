import { Person } from '../types';

export const columnNames = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const createPeopleWithParents = (
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

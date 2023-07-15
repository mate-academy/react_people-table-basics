import { Person } from './types';

export const tableColumns = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const getDetailsOfParents = (people: Person[]): Person[] => {
  const peopleMap = new Map<string, Person>();

  people.forEach(person => {
    peopleMap.set(person.name, person);
  });

  return people.map(person => {
    if (person.motherName && person.fatherName) {
      const mother = peopleMap.get(person.motherName);
      const father = peopleMap.get(person.fatherName);

      return {
        ...person,
        mother,
        father,
      };
    }

    return person;
  });
};

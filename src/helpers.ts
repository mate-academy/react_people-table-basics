import { Person } from './types';

export const createPeopleMap = (people: Person[]) => {
  const peopleMap = new Map();

  people.forEach(person => {
    peopleMap.set(person.name, person);
  });

  return peopleMap;
};

export const getPeoplesAndParents = (peopleData: Person[]) => {
  const peopleMap = createPeopleMap(peopleData);

  return peopleData.map(person => {
    const father = peopleMap.get(person.fatherName);
    const mother = peopleMap.get(person.motherName);

    return {
      ...person,
      father,
      mother,
    };
  });
};

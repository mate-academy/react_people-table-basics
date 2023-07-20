import { Person } from '../types';

const getPeopleMap = (peopleData: Person[]) => {
  const peopleMap = new Map();

  peopleData.forEach(currentPerson => peopleMap.set(
    currentPerson.name, currentPerson,
  ));

  return peopleMap;
};

export const getPeoplesWithParents = (peopleData: Person[]) => {
  const peopleMap = getPeopleMap(peopleData);

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

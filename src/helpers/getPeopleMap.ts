import { Person } from '../types';

export const getPeopleMap = (peopleData: Person[]) => {
  const peopleMap = new Map();

  peopleData.forEach(currentPerson => peopleMap.set(
    currentPerson.name, currentPerson,
  ));

  return peopleMap;
};

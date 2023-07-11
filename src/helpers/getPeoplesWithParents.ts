import { Person } from '../types';
import { getPeopleMap } from './getPeopleMap';

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

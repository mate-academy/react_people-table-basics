import { Person } from '../types';
import { noMother } from './variables';

export const getPreparedPeople = (peopleFromServer: Person[]) => {
  return peopleFromServer
    .map(person => {
      const tempPerson = person;

      tempPerson.motherName = person.motherName || noMother;
      tempPerson.fatherName = person.fatherName || noMother;
      tempPerson.mother = peopleFromServer
        .find(mother => mother.name === person.motherName);
      tempPerson.father = peopleFromServer
        .find(father => father.name === person.fatherName);

      return tempPerson;
    });
};

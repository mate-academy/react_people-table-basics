import { PersonType } from '../types';

export const getPreparedPeople = (people: PersonType[]) =>
  people.map(person => ({
    ...person,
    mother: people.find(
      currentPerson => currentPerson.name === person.motherName,
    ),
    father: people.find(
      currentPerson => currentPerson.name === person.fatherName,
    ),
  }));

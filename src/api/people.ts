import { Person } from '../types/Person';
import { PersonFromServer } from '../types/PersonFromServer';

const API_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

const findParent = (arr: PersonFromServer[], parentName: string) => {
  return arr.find(
    (parent: PersonFromServer) => parentName === parent.name,
  ) || null;
};

export const getPeople = (): Promise<PersonFromServer[]> => {
  return fetch(API_URL)
    .then(response => response.json());
};

export const getPeopleWithParentsObjects = (): Promise<Person[]> => {
  return getPeople()
    .then(people => people
      .map((person) => ({
        ...person,
        mother: findParent(people, person.motherName),
        father: findParent(people, person.fatherName),
      })));
};

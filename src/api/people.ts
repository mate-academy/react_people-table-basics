import { Person } from '../types/Person';
import { PersonFromServer } from '../types/PersonFromServer';

const API_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

const findParent = (arr: PersonFromServer[], parentName: string) => {
  return arr.find(
    (parent: PersonFromServer) => parentName === parent.name,
  )?.name || '';
};

export const getPeople = (): Promise<PersonFromServer[]> => {
  return fetch(API_URL)
    .then(response => response.json());
};

export const getPeopleWithParents = (): Promise<Person[]> => {
  return getPeople()
    .then(people => people
      .map((person, _i, arr) => ({
        name: person.name,
        sex: person.sex,
        born: person.born,
        died: person.died,
        mother: findParent(arr, person.motherName),
        father: findParent(arr, person.fatherName),
      })));
};

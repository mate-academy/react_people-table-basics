import { PersonData } from './types/PersonData';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getPeople(): Promise<PersonData[]> {
  return fetch(API_URL)
    .then(res => res.json());
}

export const getMother = (motherName:string) => {
  return getPeople()
    .then(people => people
      .find(person => person.name === motherName));
};

export const getFather = (fatherName:string) => {
  return getPeople()
    .then(people => people
      .find(person => person.name === fatherName));
};

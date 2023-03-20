import { Person } from './types';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

export const makePeopleWithParents = (people: Person[]) => {
  return people.map(p => {
    const mother = people.find(m => m.name === p.motherName);
    const father = people.find(f => f.name === p.fatherName);

    return {
      ...p,
      mother,
      father,
    };
  });
};

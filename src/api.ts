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

export const findPerson = (people: Person[], name?: string) => {
  return people.find(person => person.name === name);
};

export const extendPerson = (people: Person[]) => {
  return people.map(person => {
    const mother = findPerson(people, person.motherName);
    const father = findPerson(people, person.fatherName);

    return {
      ...person,
      mother,
      father,
    };
  });
};

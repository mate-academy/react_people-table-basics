import { Person } from './types/Person';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const COLUMN_NAMES = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const NOT_SET_VALUE = '-';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

function getParent(people: Person[], parentName: string) {
  return people.find(({ name }) => name === parentName);
}

export function addParent(people: Person[]) {
  return people.map(person => {
    let mother;
    let father;

    if (person.motherName) {
      mother = getParent(people, person.motherName);
    }

    if (person.fatherName) {
      father = getParent(people, person.fatherName);
    }

    return {
      ...person,
      mother,
      father,
    };
  });
}

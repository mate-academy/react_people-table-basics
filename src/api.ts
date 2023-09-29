import { Person } from './types/Person';

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

export function addParent(people: Person[]) {
  function getParent(parentName: string) {
    return people.find(person => person.name === parentName);
  }

  return people.map(person => {
    let mother;
    let father;

    if (person.motherName) {
      mother = getParent(person.motherName);
    }

    if (person.fatherName) {
      father = getParent(person.fatherName);
    }

    return {
      ...person,
      mother,
      father,
    };
  });
}

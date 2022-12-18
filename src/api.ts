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

export const getPeopleWithParrents = (peopleFromServer: Person[]) => {
  return peopleFromServer.map((person) => {
    const mother = person.motherName
      ? peopleFromServer.find(mom => mom.name === person.motherName) || null
      : null;

    const father = person.fatherName
      ? peopleFromServer.find(dad => dad.name === person.fatherName) || null
      : null;

    const personWithParrents = { ...person };

    if (mother) {
      personWithParrents.mother = mother;
    }

    if (father) {
      personWithParrents.father = father;
    }

    return personWithParrents;
  });
};

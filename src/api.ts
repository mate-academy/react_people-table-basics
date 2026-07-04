import { Person } from './types/Person';

// eslint-disable-next-line operator-linebreak
const API_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export function getPeople(): Promise<Person[]> {
  // keep this delay for testing purpose
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
  // .then((people: Person[]) => {
  //   people.forEach(person => {
  //     person.mother = people.find(p => p.name === person.motherName);
  //     person.father = people.find(p => p.name === person.fatherName);
  //   });

  //   return people;
  // });
}

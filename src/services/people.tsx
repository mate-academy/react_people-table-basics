import { Person } from '../types';

const BASE_URL =
  'https://mate-academy.github.io/react_people-table/api/people.json';

export function getUsers(): Promise<Person[]> {
  return fetch(BASE_URL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Failed to fetch users');
    })
    .then(people =>
      people.map((person: Person) => {
        const newPerson = person;

        if (!person.fatherName) {
          return person;
        } else {
          const father = people.find(
            (p: Person) => p.name === person.fatherName,
          );

          if (father) {
            newPerson.father = father;
          }
        }

        if (!person.motherName) {
          return person;
        } else {
          const mother = people.find(
            (p: Person) => p.name === person.motherName,
          );

          if (mother) {
            newPerson.mother = mother;
          }
        }

        return newPerson;
      }),
    );
}

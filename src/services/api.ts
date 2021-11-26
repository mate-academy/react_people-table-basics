import { Person, PersonFull } from './types';

const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export async function getPeople(): Promise<PersonFull[]> {
  const people: Person[] = await fetch(BASE_URL).then(data => data.json());

  return people.map((person) => ({
    ...person,
    father: people.find(({ name }) => person.fatherName === name),
    mother: people.find(({ name }) => person.motherName === name),
  }));
}

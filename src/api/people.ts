import { Person } from '../types/Person';

const BASE_URL = (
  'https://mate-academy.github.io/react_people-table/api/people.json'
);

export const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(BASE_URL);
  const people: Person[] = await response.json();

  return people;
};

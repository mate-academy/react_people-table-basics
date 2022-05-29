import { People } from '../types/People';

const BASE_URL = (
  'https://mate-academy.github.io/react_people-table/api/people.json'
);

export const getPeople = async (): Promise<People[]> => {
  const response = await fetch(BASE_URL);
  const people: People[] = await response.json();

  return people;
};

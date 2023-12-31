import { Person } from '../types';

export const getPeople = async () => {
  // eslint-disable-next-line
  const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

  const people: Person[] = await fetch(API_URL)
    .then(response => response.json());

  return people;
};

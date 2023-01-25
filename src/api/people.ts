import { Person } from '../types';

const API_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

export function getAll(): Promise<Person[]> {
  return fetch(API_URL).then(response => response.json());
}

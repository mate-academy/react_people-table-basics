import { Person } from '../react-app-env';

const API_URL = 'https://mate-academy.github.io/'
  + 'react_people-table/api/people.json';

export const getPeople = (): Promise<Person[]> => {
  return fetch(API_URL)
    .then(res => res.json());
};

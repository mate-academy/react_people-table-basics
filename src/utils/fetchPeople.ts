import { Person } from '../types';

/* eslint-disable-next-line */
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getPeople = (): Promise<Person[]> => {
  return wait(300)
    .then(() => fetch(BASE_URL))
    .then((response) => response.json());
};

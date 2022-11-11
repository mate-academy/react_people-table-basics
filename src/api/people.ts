import { Person } from '../types';

/* eslint-disable max-len */
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const wait = (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export const getPeople = async (): Promise<Person[]> => {
  await wait(1500);
  let response;

  try {
    response = await fetch(BASE_URL);
  } catch (error) {
    throw new Error('Can\'t get people from server');
  }

  return response.json();
};

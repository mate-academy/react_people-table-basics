import { Person } from '../types';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  let response;

  try {
    response = await fetch(BASE_URL);
  } catch (error) {
    throw new Error('Cant get people from the server');
  }

  return response.json();
};

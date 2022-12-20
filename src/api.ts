import { Person } from './types/Person';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  let response;

  try {
    response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error('Error Loading');
    }
  } catch (error) {
    throw new Error('Error Loading');
  }

  return response.json();
};

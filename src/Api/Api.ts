import { Person } from '../react-app-env';

const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(URL);

  return response.json();
};

/* eslint-disable max-len */
const API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export async function getPeople(): Promise<Person[]> {
  const response = await fetch(API);

  if (!response.ok) {
    throw new Error('Server failed to load');
  }

  return response.json();
}

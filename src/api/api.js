export const BASE_URL = 'https://mate-academy.github.io/';

export async function getPeople() {
  const response = await fetch(`${BASE_URL
  }react_people-table/api/people.json`);
  const result = await response.json();

  return result;
}

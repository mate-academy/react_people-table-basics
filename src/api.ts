// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export async function getPeople() {
  const respone = await fetch(API_URL);

  return respone.json();
}

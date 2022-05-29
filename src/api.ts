const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export async function getPeople() {
  const response = await fetch(URL);

  return response.json();
}

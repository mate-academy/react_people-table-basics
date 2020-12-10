export const BASE_URL
  = `https://mate-academy.github.io/react_people-table/api/people.json`;

export async function getPeople() {
  const response = await fetch(BASE_URL);

  return response.json();
}

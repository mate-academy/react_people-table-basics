// eslint-disable-next-line @typescript-eslint/quotes
const API_URL = `https://mate-academy.github.io/react_people-table/api/people.json`;

export async function getPeople() {
  const response = await fetch(API_URL);

  const movies = await response.json();

  return movies;
}

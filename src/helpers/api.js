// eslint-disable-next-line
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json'

export const getPeople = async() => {
  const people = await fetch(BASE_URL);

  return people.json();
};

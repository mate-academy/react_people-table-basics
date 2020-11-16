// eslint-disable-next-line max-len
const PEOPLE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const people = await fetch(PEOPLE_URL);

  return people.json();
};

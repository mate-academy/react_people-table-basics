// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const res = await fetch(API_URL);

  return res.json();
};

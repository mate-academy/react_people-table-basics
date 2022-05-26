// eslint-disable-next-line
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async () => {
  const response = await fetch(API_URL);

  return response.json();
};

const BASE_API = 'https://mate-academy.github.io/react_people-table/api/';

export const getPeople = async () => {
  const response = await fetch(`${BASE_API}/people.json`);

  return response.json();
};

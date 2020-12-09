const BASE_URL = 'https://mate-academy.github.io'
+ '/react_people-table/api/people.json';

export const request = async() => {
  const response = await fetch(`${BASE_URL}`);

  if (!response) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};

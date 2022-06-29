const BASE_URL
= 'https://mate-academy.github.io/react_people-table/api/people.json';

export const request = async () => {
  const result = await fetch(`${BASE_URL}`);

  return result.json();
};

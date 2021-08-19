const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const resolved = await fetch(URL);
  const result = await resolved.json();

  return result;
};

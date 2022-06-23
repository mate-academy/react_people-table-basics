const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async () => {
  const res = await fetch(URL);

  return res.json();
};

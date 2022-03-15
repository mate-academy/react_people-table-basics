const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const peopleFromServer = async () => {
  const res = await fetch(BASE_URL);

  return res.json();
};

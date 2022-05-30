const API_URL = (
  'https://mate-academy.github.io/react_people-table/api/people.json'
);

export const getPeople = async () => {
  const responce = await fetch(API_URL);

  return responce.json();
};

const BASE_API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async () => {
  return await fetch(BASE_API);
}

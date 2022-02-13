const BASE_API = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async (): Promise<PersonFromServer[]> => {
  const people = await fetch(BASE_API);

  return people.json();
};

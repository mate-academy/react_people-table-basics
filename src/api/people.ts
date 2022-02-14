export const getPeople = async () => {
  const url = 'https://mate-academy.github.io/react_people-table/api/people.json';
  const response = await fetch(url);

  return response.json();
};

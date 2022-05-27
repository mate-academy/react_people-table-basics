const apiUrl = (
  'https://mate-academy.github.io/react_people-table/api/people.json'
);

export const getPeople = async () => {
  const response = await fetch(apiUrl);

  return response.json();
};

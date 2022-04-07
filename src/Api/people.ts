export const getPeople = async () => {
  const response = await (await fetch('https://mate-academy.github.io/react_people-table/api/people.json')).json();

  return response;
};

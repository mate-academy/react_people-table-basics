export const getPeople = async (): Promise<Person[]> => {
  const result = await
  fetch('https://mate-academy.github.io/react_people-table/api/people.json');

  return result.json();
};

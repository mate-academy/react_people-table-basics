export const URL
  = 'https://mate-academy.github.io/'
  + 'react_people-table/'
  + 'api/people.json';

export const getAllPeople = async (url : string) => {
  const data = await fetch(url);

  return data.json();
};

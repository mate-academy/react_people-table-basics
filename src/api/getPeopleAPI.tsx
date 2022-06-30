// eslint-disable-next-line max-len
const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeopleFromServer = async () => {
  const promise = await fetch(URL);
  const peopleServer = await promise.json();

  return peopleServer;
};

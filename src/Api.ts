// eslint-disable-next-line max-len
const apiLink = 'https://mate-academy.github.io/react_people-table/api/people.json1';

export const getPeople = async () => {
  return (await fetch(apiLink)).json();
};

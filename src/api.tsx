export const getPeople = () => {
  // eslint-disable-next-line max-len
  return fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(people => people.json());
};

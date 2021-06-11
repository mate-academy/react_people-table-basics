const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => (
  fetch(url)
    .then(response => response.json())
    // eslint-disable-next-line no-console
    .catch(console.log)
);

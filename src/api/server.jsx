const URL = 'https://mate-academy.github.io/react_people-table/api';

const request = url => fetch(`${URL}${url}`)
  .then(response => response.json());

export const getPeople = () => request('/people.json');

const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

export const request = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json());

export const getPeople = () => request('/people.json');

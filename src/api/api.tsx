const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const requeste = () => (
  fetch(`${BASE_URL}`)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject(new Error('Some error message')))));

export const getPeople = () => requeste();
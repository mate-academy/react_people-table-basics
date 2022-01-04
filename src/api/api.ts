const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

export const getPeople = () => (
  fetch(`${BASE_URL}/people.json`)
    .then(response => {
      return response.ok
        ? response.json()
        : Promise.reject(new Error('error'));
    })
);

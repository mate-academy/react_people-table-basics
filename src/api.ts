const API_URL = 'https://mate-academy.github.io/react_people-table/api/';

export const getPeople = () => {
  return fetch(`${API_URL}people.json`).then(res => res.json());
};

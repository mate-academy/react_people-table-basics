const URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeopleFromServer = () => {
  return fetch(URL)
    .then(response => response.json());
};

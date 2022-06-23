// eslint-disable-next-line max-len
const apiUrl = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeopleFromAPI = (): Promise<People[]> => {
  return fetch(apiUrl)
    .then(promise => promise.json());
};

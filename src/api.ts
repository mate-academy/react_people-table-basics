// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

function getData<T>(): Promise<T> {
  return fetch(BASE_URL)
    .then(response => response.json());
}

export const getPeople = () => getData<Person[]>();

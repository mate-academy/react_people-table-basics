/* eslint-disable */
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const client = {
  get<T>(): Promise<T> {
    return fetch(BASE_URL)
      .then(handleResponse);
  },
};

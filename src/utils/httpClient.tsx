import { Person } from '../types';

const BASE_URL
= 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const handleResponse = (response: Response) => {
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const client = {
  get<T>(): Promise<T> {
    return wait(1000)
      .then(() => fetch(BASE_URL))
      .then(handleResponse);
  },
};

export function getPeople() {
  return client.get<Person[]>();
}

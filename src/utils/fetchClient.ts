import { Person } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = 'https://mate-academy.github.io/react_people-table/api';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request<T>(
  url: string,
  method = 'GET',
): Promise<T> {
  const options: RequestInit = { method };

  return wait(100)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};

export const getPeople = () => {
  return client.get<Person[]>('/people');
};

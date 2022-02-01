import { BASE_URL } from './api';
import { Human } from '../interface/Human__interface';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getPeople = (): Promise<Human[]> => {
  return request('/people.json');
};

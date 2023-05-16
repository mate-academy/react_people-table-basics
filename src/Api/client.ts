import { PEOPLE_URL } from '../constants';

export const getPeople = () => {
  return fetch(PEOPLE_URL);
};

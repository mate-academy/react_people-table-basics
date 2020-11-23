import { BASE_URL } from './api';

export const getPeople = async() => {
  const responce = await fetch(`${BASE_URL}`);
  return responce.json();
};
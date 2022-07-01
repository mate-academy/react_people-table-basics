import { API_URL } from './api';

const API_PEOPLE = `${API_URL}/people.json`;

export const getPeople = async () => {
  const response = await fetch(API_PEOPLE);

  return response.json();
};

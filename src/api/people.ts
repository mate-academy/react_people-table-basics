import { BASE_URL } from './api';

import { People } from '../types/people';

export const getPeopleFromServer = async (): Promise<People[]> => {
  const response = await fetch(`${BASE_URL}/people.json`);

  return response.json();
};

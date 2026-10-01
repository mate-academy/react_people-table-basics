import { Person } from '../types';
import { client } from '../utils/fetchClient';

export const getPeople = () => {
  return client.get<Person[]>(`/people.json`);
};

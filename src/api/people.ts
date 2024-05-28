import { client } from '../utils/fetchClient';
import { Person } from '../types';

export const getPeople = () => {
  return client.get<Person[]>('/people.json');
};

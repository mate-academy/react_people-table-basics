import { client } from '../httpClient';
import { Person } from '../types';

export function getPeople() {
  return client.get<Person[]>();
}

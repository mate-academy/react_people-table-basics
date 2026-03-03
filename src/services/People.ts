import { getData } from '../utils/HttpClient';
import type { Person } from '../types';

export function getPeople() {
  return getData<Person[]>('/people.json');
}

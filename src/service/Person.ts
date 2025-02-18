import { Person } from '../types';
import { getData } from '../utility/httpClien';

export function getPerson() {
  return getData().then((persons: Person[]) => persons);
}

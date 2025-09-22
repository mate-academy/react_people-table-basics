import { Person } from '../types';
import peopleData from './people.json';

const FAKE_DELAY = 500;

const people: Person[] = peopleData as Person[];

export const getPeople = (): Promise<Person[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(people);
    }, FAKE_DELAY);
  });
};

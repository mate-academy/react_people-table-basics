import { Person } from './types';

export const getParent = (people: Person[], name: string | null) => (
  people.find(person => person.name === name)
);

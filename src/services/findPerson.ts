import { Person } from '../types';

export const findPerson = (people: Person[], personName: string | null) =>
  people.find(item => item.name === personName);

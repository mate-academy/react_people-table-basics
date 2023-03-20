import { Person } from '../types';

export const findParents = (
  peopleData: Person[],
  name: string | null,
) => peopleData.find(person => person.name === name);

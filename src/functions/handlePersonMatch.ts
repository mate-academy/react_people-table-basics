import { Person } from '../types/Person';

export const handlePersonMatch = (people: Person[], name: string | null) => {
  return people.find(person => person.name === name);
};

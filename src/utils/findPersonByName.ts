import { Person } from './../types/Person';

export const findPersonByName = (people: Person[], name: string | null) =>
  people.find(person => person.name === name);

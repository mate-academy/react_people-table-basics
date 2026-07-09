import { Person } from './types';

export const getPersonLinkName = (person: Person) => {
  return (person.name.toLowerCase() + ' ' + person.born).split(' ').join('-');
};

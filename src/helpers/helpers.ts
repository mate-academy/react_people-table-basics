import { Person } from '../types';

export const findPersonSlugByName = (
  name: string | null,
  peopleList: Person[],
): string | null => {
  const person = peopleList.find(p => p.name === name);

  return person ? person.slug : null;
};

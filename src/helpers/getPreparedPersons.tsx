import { Person } from '../types';
import { findRelative } from './findRelative';
import { MAN_MALE } from '../constants/MAN_MALE';
import { WOMEN_MALE } from '../constants/WOMEN_MALE';

export const getPreparedPersons = (allPersons: Person[]) => {
  return [...allPersons].map(onePerson => {
    const mother = findRelative(WOMEN_MALE, onePerson, allPersons);
    const father = findRelative(MAN_MALE, onePerson, allPersons);

    return {
      ...onePerson,
      mother,
      father,
    };
  });
};

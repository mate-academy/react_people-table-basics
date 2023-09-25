import { PersonType } from '../types';
import { GENDER_FEMALE } from './consts';

export function getMother(persons: PersonType[], person: PersonType) {
  return persons.find(({ sex, name }: PersonType) => sex === GENDER_FEMALE
    && name === person.motherName);
}

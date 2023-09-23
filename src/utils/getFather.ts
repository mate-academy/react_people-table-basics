import { PersonType } from '../types';
import { GENDER_MALE } from './consts';

export function getFather(persons: PersonType[], person: PersonType) {
  return persons.find(({ sex, name }: PersonType) => sex === GENDER_MALE
    && name === person.fatherName);
}

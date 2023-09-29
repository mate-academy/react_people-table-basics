import { Person } from '../types';
import { FEMALE_SEX, MALE_SEX } from './constants';

export function getPersonFather(people: Person[], person: Person) {
  return people.find(({ sex, name }: Person) => sex === MALE_SEX
    && name === person.fatherName);
}

export function getPersonMother(persons: Person[], person: Person) {
  return persons.find(({ sex, name }: Person) => sex === FEMALE_SEX
    && name === person.motherName);
}

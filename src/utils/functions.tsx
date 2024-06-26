import { PersonLink } from "../components/PersonLink/PersonLink";
import { Person } from '../types/Person'

export const chooseMotherLink = (person: Person) => {
  if (!person.motherName) {
    return `-`;
  }

  if (person.mother) {
    return <PersonLink person={person.mother} />;
  }

  return `${person.motherName}`;
};

export const chooseFatherLink = (person: Person) => {
  if (!person.fatherName) {
    return `-`;
  }

  if (person.father) {
    return <PersonLink person={person.father} />;
  }

  return `${person.fatherName}`;
};

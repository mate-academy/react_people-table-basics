import { Person } from '../types';

export function getPersonParent(
  person: Person,
  people: Person[],
  parent: 'mother' | 'father',
): Person | string {
  if (parent === 'mother') {
    if (person.motherName === null) {
      return '-';
    }

    return people.find(
      isParent => isParent.name === person.motherName,
    )
    || person.motherName;
  }

  if (parent === 'father') {
    if (person.fatherName === null) {
      return '-';
    }

    return people.find(
      isParent => isParent.name === person.fatherName,
    )
    || person.fatherName;
  }

  return '-';
}

import { Person, PersonOmit } from '../types';

export default function getPreparedPeople(people: PersonOmit[]): Person[] {
  return people.map(person => {
    const mother = people.find(
      currentPerson => currentPerson.name === person.motherName,
    );

    const father = people.find(
      currentPerson => currentPerson.name === person.fatherName,
    );

    return { ...person, mother, father };
  });
}

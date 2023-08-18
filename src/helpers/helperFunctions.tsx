import { PersonLink } from '../components/PersonLink/PersonLink';
import { Person } from '../types/Person';

export const findPerson = (personName: string, people: Person[]) => {
  const foundPerson = people.find(person => person.name === personName);

  if (foundPerson) {
    return (
      <PersonLink
        slug={foundPerson.slug}
        sex={foundPerson.sex}
        title={foundPerson.name}
      />
    );
  }

  return personName;
};

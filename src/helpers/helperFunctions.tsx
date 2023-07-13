import { PersonLink } from '../components/PersonLink/PersonLink';
import { Person } from '../types/Person';

export const findPerson = (personName: string, personsArray: Person[]) => {
  const foundPerson = personsArray.find(pers => pers.name === personName);

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

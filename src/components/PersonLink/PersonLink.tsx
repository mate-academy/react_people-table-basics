import { Person } from '../../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const foundPerson = people.find(
    personFromList => personFromList.name === person.name,
  );

  return foundPerson ? (
    <a
      href={`#/people/${foundPerson.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </a>
  ) : (
    person.name
  );
};

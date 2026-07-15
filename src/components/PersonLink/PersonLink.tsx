import { Person } from '../../types';

type PersonProps = {
  person: Person;
};

export const PersonLink = ({ person }: PersonProps) => {
  return (
    <a
      href={`#/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </a>
  );
};

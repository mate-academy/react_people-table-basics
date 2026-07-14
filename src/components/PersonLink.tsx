import { Person } from '../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <a href={`#/people/${person.slug}`} className={className}>
      {person.name}
    </a>
  );
};

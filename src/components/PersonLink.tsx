import { Person } from '../types';
import { Link } from 'react-router-dom';

type PersonLinkProps = {
  person: Person;
  onSelect?: (slug: string) => void;
};

export const PersonLink = ({ person, onSelect }: PersonLinkProps) => {
  if (!person.slug) {
    return <span>{person.name}</span>;
  }

  return (
    <Link
      to={`/people/${person.slug}`}
      onClick={() => onSelect?.(person.slug)}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
    >
      {person.name}
    </Link>
  );
};

import { Link } from 'react-router-dom';
import type { PersonLinkProps } from '../../types/PersonLinkPrors';

export const PersonLink = ({ person, personName }: PersonLinkProps) => {
  if (person) {
    const isFemale = person.sex === 'f';

    return (
      <Link
        to={`/people/${person.slug}`}
        className={isFemale ? 'has-text-danger' : ''}
      >
        {person.name}
      </Link>
    );
  }

  if (personName) {
    return <span>{personName}</span>;
  }

  return null;
};

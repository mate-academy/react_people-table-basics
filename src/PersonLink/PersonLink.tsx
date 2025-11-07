import { Link } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink = ({
  name,
  person,
}: {
  name: string | null;
  person?: Person;
}) => {
  if (!name) {
    return <span>-</span>;
  }

  const isFemale = (name && name === person?.motherName) || person?.sex === 'f';
  const className = isFemale ? 'has-text-danger' : '';

  if (person && person.slug) {
    return (
      <Link to={`/people/${person.slug}`} className={className}>
        {name}
      </Link>
    );
  }

  return <span className={className}>{name}</span>;
};

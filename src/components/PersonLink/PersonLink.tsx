import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface PersonLinkProps {
  person?: Person;
  name?: string | null;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person, name }) => {
  const displayName = name || person?.name;

  if (!displayName) {
    return <>-</>;
  }

  if (!person) {
    return <>{displayName}</>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {displayName}
    </Link>
  );
};

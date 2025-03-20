import { Link } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
  className?: string;
}

const PersonLink: React.FC<PersonLinkProps> = ({ person, className = '' }) => {
  const sexClass = person.sex === 'm' ? 'has-text-info' : 'has-text-danger';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={`has-text-weight-bold ${sexClass} ${className}`}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;

import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person: Person;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function PersonLink({ person, onClick }: PersonLinkProps) {
  const { slug, name, sex } = person;

  return (
    <Link
      to={`/people/${slug}`}
      className={sex === 'female' ? 'has-text-danger' : ''}
      onClick={onClick}
    >
      {name}
    </Link>
  );
}

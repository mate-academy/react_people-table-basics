import { Link } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person?: Person | null;
  name?: string;
  onClick?: () => void; // для row selection
}

export const PersonLink: React.FC<PersonLinkProps> = ({
  person,
  name,
  onClick,
}) => {
  if (person) {
    return (
      <Link
        to={`/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : 'has-text-link'}
        onClick={onClick}
      >
        {person.name}
      </Link>
    );
  }

  if (name) {
    return <span>{name}</span>;
  }

  return <>-</>;
};

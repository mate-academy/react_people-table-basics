import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink = ({ person }: PersonLinkProps) => {
  const { name, sex, slug } = person;

  return (
    <Link
      className={sex === 'f' ? 'has-text-danger' : ''}
      to={`/people/${slug}`}
    >
      {name}
    </Link>
  );
};

import { Link } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink: React.FC<{
  person: Person | undefined;
  name: string;
}> = ({ person, name }) => {
  if (!person) {
    return <span>{name}</span>;
  }

  const linkClass = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={linkClass}>
      {name}
    </Link>
  );
};

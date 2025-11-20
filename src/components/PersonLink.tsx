import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person | null;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  if (!person) {
    return <span>-</span>;
  }

  const className = person.sex === 'f' ? 'has-text-danger' : '';

  return (
    <Link to={`/people/${person.slug}`} className={className}>
      {person.name}
    </Link>
  );
};

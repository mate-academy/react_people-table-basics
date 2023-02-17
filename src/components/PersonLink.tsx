import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

export const PersonLink: React.FC<{ person: Person }> = ({ person }) => {
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({
        'has-text-danger': isFemale,
      })}
    >
      {person.name}
    </Link>
  );
};

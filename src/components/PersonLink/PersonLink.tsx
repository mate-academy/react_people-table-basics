import { Link } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

export const PersonLink: React.FC<{ person: Person | null }> = ({ person }) =>
  person ? (
    <Link
      to={`/people/${person.slug}`}
      data-cy="personLink"
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  ) : (
    <span data-cy="emptyParent">-</span>
  );

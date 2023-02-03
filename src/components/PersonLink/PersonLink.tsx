import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    className={cn(
      { 'has-text-danger': person.sex === 'f' },
    )}
    to={`/people/${person.slug}`}
  >
    {person.name}
  </Link>
);

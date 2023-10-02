import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonLink: React.FC<Props> = ({ person }) => (
  <Link
    to={person.slug}
    className={cn({
      [person.sex === 'f' ? 'has-text-danger' : 'has-text-link']: true,
    })}
  >
    {person.name}
  </Link>
);

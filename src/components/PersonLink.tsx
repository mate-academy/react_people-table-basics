
import { Link } from 'react-router-dom';
import cn from 'classnames';
import type { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => (
  <Link
    to={`/people/${person.slug}`}
    className={cn({
      'has-text-danger': person.sex === 'f',
    })}
  >
    {person.name}
  </Link>
);

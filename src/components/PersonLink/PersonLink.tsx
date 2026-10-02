import { Link } from 'react-router-dom';
import cn from 'classnames';

import type { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

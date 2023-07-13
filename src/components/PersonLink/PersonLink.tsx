import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

const FEMALE_SIGN = 'f';

interface Props {
  person: Person
}

export const PersonLink: FC<Props> = ({ person }) => (
  <Link
    className={cn({
      'has-text-danger': person.sex === FEMALE_SIGN,
    })}
    to={person.slug}
  >
    {person.name || '-'}
  </Link>
);

import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

const femaleSex = 'f';

interface Props {
  person: Person
}

export const PersonLink: FC<Props> = ({ person }) => (
  <Link
    className={cn({
      'has-text-danger': person.sex === femaleSex,
    })}
    to={person.slug}
  >
    {person.name || '-'}
  </Link>
);

import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink:FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={cn({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </Link>
);

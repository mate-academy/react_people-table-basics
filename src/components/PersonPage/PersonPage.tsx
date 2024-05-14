import { FC } from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

interface Props {
  person: Person;
}

export const PersonPage: FC<Props> = ({ person }) => (
  <Link
    to={`/people/${person.slug}`}
    className={classNames({ 'has-text-danger': person.sex === 'f' })}
  >
    {person.name}
  </Link>
);

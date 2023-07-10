import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  selectedSlug: string;
}

export const PersonLink: FC<Props> = ({ person, selectedSlug }) => {
  return (
    <Link
      to={`/people/${selectedSlug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

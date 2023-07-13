import { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const isPersonFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': isPersonFemale })}
    >
      {person.name}
    </Link>
  );
};

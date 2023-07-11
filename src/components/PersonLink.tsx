import cn from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

const FEMALE = 'f';

interface Props {
  person: Person;
}

export const PersonLink:FC<Props> = ({ person }) => {
  const isPersonFemale = person.sex === FEMALE;

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': isPersonFemale })}
    >
      {person.name}
    </Link>
  );
};

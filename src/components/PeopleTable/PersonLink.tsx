import { FC } from 'react';
import { Person } from '../../types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({
        'has-text-danger': person.sex === 'f',
      })}
    >
      {person.name}
    </Link>
  );
};

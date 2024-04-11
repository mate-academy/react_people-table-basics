import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';
import { Link } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const isFemale = person.sex === 'f';

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {person.name}
    </Link>
  );
};

import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';
import { Link } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = ({ person }) => {
  const female = 'f';
  const isFemale = person.sex === female;

  return (
    <Link
      to={`/people/${person.slug}`}
      className={cn({ 'has-text-danger': isFemale })}
    >
      {person.name}
    </Link>
  );
};

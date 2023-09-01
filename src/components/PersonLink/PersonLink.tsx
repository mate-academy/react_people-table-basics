import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

const FEMALE = 'f';

export const PersonLink: FC<Props> = ({ person }) => {
  const { name, slug } = person;
  const isFemale = person.sex === FEMALE;

  return (
    <Link
      className={cn({
        'has-text-danger': isFemale,
      })}
      to={slug}
    >
      {name}
    </Link>
  );
};

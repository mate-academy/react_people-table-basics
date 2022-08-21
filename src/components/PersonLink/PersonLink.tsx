import cn from 'classnames';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = memo(({ person }) => (
  <Link
    className={cn({ 'has-text-danger': person.sex === 'f' })}
    to={`/people/${person.slug}`}
  >
    {person.name}
  </Link>
));

import { Link } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink = ({ person }: Props) => {
  if (!person.slug) {
    return (
      <span className={classNames({ 'has-text-danger': person.sex === 'f' })}>
        {person.name}
      </span>
    );
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

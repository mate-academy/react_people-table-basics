import classNames from 'classnames';
import { Person } from '../../types';
import { Link } from 'react-router-dom';

export const PersonLink = ({ person }: { person: Person }) => {
  return (
    <Link
      to={`/people/${person.slug}`}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {person.name}
    </Link>
  );
};

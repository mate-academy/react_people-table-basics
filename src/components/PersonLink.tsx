import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: FC<Props> = (props) => {
  const { person } = props;

  return (
    <Link
      className={classNames(
        { 'has-text-danger': person.sex === 'f' },
      )}
      to={`/people/${person.slug}`}
    >
      {person.name}
    </Link>
  );
};

import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';

interface PersonLinkInterface {
  person: Person;
}

export const PersonLink: FC<PersonLinkInterface> = ({ person }) => {
  const {
    name,
    sex,
    slug,
  } = person;

  const personLinkClasses = classNames('has-text-link', {
    'has-text-danger': sex === 'f',
  });

  return (
    <Link
      to={`/people/${slug}`}
      className={personLinkClasses}
    >
      {name}
    </Link>
  );
};

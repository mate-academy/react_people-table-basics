import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PageRoutes } from '../../types/PageRoutes';

interface PersonProps {
  person: Person,
}
export const PersonLink: React.FC<PersonProps> = ({ person }) => {
  const { sex, name, slug } = person;

  return (
    <Link
      className={classNames(
        { 'has-text-danger': sex === 'f' },
      )}
      to={`${PageRoutes.PeoplePage}/${slug}`}
    >
      {name}
    </Link>
  );
};

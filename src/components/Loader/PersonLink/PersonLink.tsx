import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';

type PersonLinkProps = {
  people: Person,
};

export const PersonLink:React.FC<PersonLinkProps> = ({ people }) => {
  const { name, sex, slug } = people;

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};

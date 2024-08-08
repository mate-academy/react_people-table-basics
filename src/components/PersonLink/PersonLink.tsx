import React from 'react';
import { Person } from '../../types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const FEMALE = 'f';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug, name, sex } = person;
  const className = classNames({ 'has-text-danger': sex === FEMALE });

  return (
    <Link to={`/people/${slug}`} className={className}>
      {name}
    </Link>
  );
};

import React from 'react';
import { Person } from './types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type PersonLinkProps = {
  person?: Person;
};

const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  if (!person) {
    return null;
  }

  return (
    <Link
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
      to={person.slug}
    >
      {person.name}
    </Link>
  );
};

export default PersonLink;

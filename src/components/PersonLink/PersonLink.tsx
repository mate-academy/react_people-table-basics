import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type PersonLinkProps = {
  person: Person;
};

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { slug, name, sex } = person;
  const navigate = useNavigate();

  return (
    <Link
      to={`/people/${slug}`}
      className={classNames({ 'has-text-danger': sex === 'f' })}
      onClick={() => navigate(`/people/${slug}`)}
    >
      {name}
    </Link>
  );
};
